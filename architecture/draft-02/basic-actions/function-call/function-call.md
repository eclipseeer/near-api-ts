# Action Creator - Function Call (final)

In this document, we will provide API examples and usage of the `functionCall`
action creator and address possible questions regarding API style.

## Options

### Option 1 - Chosen

```ts
/**
 * name: required;
 * optional jsonArgs || byteArgs, if both - error;
 * required tGas || gas, if both - error;
 * optional unitPayment || tokenPayment, if both - error;
 */

type ByteArgs = Uint8Array | ArrayBuffer | Buffer;
type Gas = bigint | string;
type TGas = bigint | string;
type UnitPayment = bigint | string;
type TokenPayment = bigint | number | string;

type FnArgs<JsonArgs> =
  | { jsonArgs: JsonArgs; byteArgs?: never }
  | { jsonArgs?: never; byteArgs: ByteArgs }
  | { jsonArgs?: never; byteArgs?: never };

type GasLimit = { gas?: never; tGas: TGas } | { gas: Gas; tGas?: never };

type Payment =
  | { unitPayment: UnitPayment; tokenPayment?: never }
  | { unitPayment?: never; tokenPayment: TokenPayment }
  | { unitPayment?: never; tokenPayment?: never };

type FunctionCallAction<JsonArgs> = {
  name: string;
} & FnArgs<JsonArgs> &
  GasLimit &
  Payment;
```

```ts
functionCall({
  name: 'ft_transfer',
  jsonArgs: {
    receiver_id: 'alice.near',
    amount: '10500000000',
  },
  tGas: 100,
  unitPayment: '1',
});
```

### Option 2

This option is not suitable due to the inconsistency in parameter formatting -
the format needs to be repeated to reduce cognitive load on users, except
in cases where it is truly justified.

```ts
functionCall({
  name: 'ft_transfer',
  jsonArgs: {
    receiver_id: 'alice.near',
    amount: '10500000000',
  },
  tGas: 100,
  payment: {
    tokens: 10.25,
  },
});
```

### Option 3

This option is not suitable due to unnecessary data nesting, which worsens
code readability without any clear benefits.

```ts
functionCall({
  name: 'ft_transfer',
  args: {
    json: {
      receiver_id: 'alice.near',
      amount: '10500000000',
    },
  },
  limit: {
    tGas: 100,
  },
  payment: {
    units: '1',
  },
});
```

## FAQ

#### Why do we use field `payment` instead of `deposit`?

In general, the term `deposit` implies collateral that is usually returned to the
person who provided it, with some exceptions—for example, when a user provided
a deposit as collateral for a car rental, but then damaged the vehicle.

At the same time, in the context of Near Protocol, the funds that a user attaches
during a smart contract function call can, with equal probability (ignoring runtime errors),
either be returned in the future (for example, `storage_deposit`) or never be
returned at all - for example, when creating a new .near account via a smart
contract call or attaching 1` yoctoNear` for an FT transfer.

Considering this, we use the term `payment`, which encompasses `deposit` and is
a broader concept that covers any transfer of money.

---

#### Why *Payment and *Gas could accept multiple types?

The main goal is to make the library easier to use. How?

We can generally split all data sources for Payment and Gas into two categories:

1. Numeric (when the user performs mathematical operations)
2. String (when an end user enters a value in a form)

Forcing everything into a single type would require users to constantly convert
between String and BigInt (or vice versa), which adds unnecessary friction.
Instead, we will automatically detect the argument’s type inside the function
and convert it to the required format, so developers don’t have to do it
manually. Any performance impact here is effectively zero in the context
of overall transaction execution time.

---

#### Why not to use helpers like ` NEAR`\``1.5`\` or `toYocto(2.5)`?

The main reason is that it forces the user to import and call a function every
time they want to perform a token operation. In return, this provides no
benefits other than explicit type declaration.

The problem is that even when using `NEAR`\``1.5`\` , a user can still pass
invalid data like `NEAR`\``abc`\` , which means we need to validate data at runtime.
The question is: why do this in a separate function when it can be
done directly in functionCall, avoiding unnecessary boilerplate?

Another problem is that in most cases the user will be forced to
write `NEAR`\``${amount}`\` to pass variables, which makes the code even more complicated.

---

#### Why we accept type number(float) as tokenPayment? It can cause this: `0.1 + 0.2 = 0.30000000000000004`

Because we do not perform any mathematical operations inside `functionCall` and
simply convert `1.5` into yoctoNear (`u128` type). If users wants to perform
arithmetic with decimal values, they will do it outside the library.

For example, they might write:

```ts
const amount = 0.1 + 0.2;

functionCall({
  tokenPayment: String(amount),
});
```

And we have no way to control or prevent this. Therefore, we consider it to be the user’s responsibility.

---

#### Why `gas` and `tGas` doesn't accept type `number`?

We believe that in the vast majority of cases, an integer value for `tGas` will
be sufficient. In those rare situations where a user needs to specify something
like `tGas: 10.5 `, they can implement their own conversion function to calculate
the appropriate gas value. By definition, `gas` cannot be a floating-point number,
as this is a blockchain constraint.

---

#### Why we don't have a default gas and force user to specify it manually?

Due to NEP-536, full refunds for unused gas will no longer be available.
This means that if we use a default gas amount of `300 TGas`, end users will
spend significantly more tokens than necessary.
Another problem - if a transaction
actually uses `10 TGas`, but you attach `300 TGas`, the end user must have `30x` more
tokens on their balance than are truly needed.

---

#### Why do we use unitPayment / tokenPayment instead of yoctoPayment / nearPayment?

In order to ensure a consistent style, we will use a unit/token prefix for the
native NEAR token as well as for all FT tokens to unify the terminology.

---

### Examples

```ts
// Example #1
functionCall({
  name: 'callWithNoArgs',
  gas: 300000000000,
});

// Example #2
functionCall({
  name: 'ft_transfer',
  jsonArgs: {
    receiver_id: 'alice.near',
    amount: toUnits({ tokens: '10.25', desimals: 8n }),
  },
  tGas: 100,
  unitPayment: '1',
});

// Example #3
// Some function which return Uint8Array | ArrayBuffer | Buffer data;
const byteArgs = serializeBorshArgs({
  name: 'alice',
  message: 'Hello Near',
});

functionCall({
  name: 'fn_with_borsh_args',
  byteArgs,
  tGas: 300,
  tokenPayment: 2.5,
});
```
