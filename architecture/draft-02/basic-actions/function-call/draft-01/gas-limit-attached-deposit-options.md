# Signature Options

Below we will show up different options of functionCall gasLimit and attachedDeposit fields.

We agree to use gasLimit and attachedDeposit as field names.

## Static String

Pros:

- Perfect readability
- No need to import anything

Cons:

- Extremely error-prone while typing - very easy to type NEAT instead or NEAR and so
- Static - can't pass a variable

```ts
functionCall({
  name: 'contract_method',
  gasLimit: '25.5 TGas',
  attachedDeposit: '0.01 NEAR',
});

functionCall({
  name: 'contract_method',
  gasLimit: '5000 Gas',
  attachedDeposit: '100 yoctoNEAR',
});

functionCall({
  name: 'contract_method',
  gasLimit: '300 GGas',
  attachedDeposit: '2500 μNEAR',
});
```

---

## Dynamic String

Pros:

- Can use dynamic values
- No need to import anything

Cons:

- Still error-prone
- Typing is ever harder compare to the static string
- Readability comes down

```ts
functionCall({
  name: 'contract_method',
  gasLimit: `${gasLimit} TGas`,
  attachedDeposit: `${attachedDeposit} NEAR`,
});

functionCall({
  name: 'contract_method',
  gasLimit: `${gasLimit} Gas`,
  attachedDeposit: `${attachedDeposit} yoctoNEAR`,
});
```

---

## Static Template Strings

Pros:

- Less writing compare to strings
- Less error-prone while typing compare to string

Cons:

- Static - can't pass a variable
- Need to import extra functions every time

```ts
functionCall({
  name: 'contract_method',
  gasLimit: TGas`25.5`,
  attachedDeposit: NEAR`0.01`,
});

functionCall({
  name: 'contract_method',
  gasLimit: Gas`5000`,
  attachedDeposit: yoctoNEAR`100`,
});

functionCall({
  name: 'contract_method',
  gasLimit: GGas`300`,
  attachedDeposit: μNEAR`2500`,
});
```

---

## Dynamic Template Strings

Pros:

- Can use dynamic values
- Way less error-prone compared to dynamic strings

Cons:

- Extra typing still required
- Readability is poor

```ts
functionCall({
  name: 'contract_method',
  gasLimit: TGas`${gasLimit}`,
  attachedDeposit: NEAR`${attachedDeposit}`,
});

functionCall({
  name: 'contract_method',
  gasLimit: Gas`${gasLimit}`,
  attachedDeposit: yoctoNEAR`${attachedDeposit}`,
});
```

---

## Functions

Pros:

- Can use dynamic values
- Low chance to do an error

Cons:

- Need extra import

```ts
functionCall({
  name: 'contract_method',
  gasLimit: gas.gas(3000000),
  attachedDeposit: near.near(1.5),
});

functionCall({
  name: 'contract_method',
  gasLimit: gas.tGas(100),
  attachedDeposit: near.yocto(1),
});

functionCall({
  name: 'contract_method',
  gasLimit: toTGas(tGasVar),
  attachedDeposit: toNEAR(1.5),
});

functionCall({
  name: 'contract_method',
  gasLimit: teraGas(300),
  attachedDeposit: yoctoNear(1.5),
});

functionCall({
  name: 'contract_method',
  gasLimit: gas(300),
  attachedDeposit: near(1.5),
});
```

---

## Nested Object

Pros:

- Can use dynamic values
- No extra import
- Can use dynamic values

Cons:

- Extra learning efforts required
- A little extra verbose

#### Option 1

```ts
functionCall({
  name: 'contract_method',
  gasLimit: {
    gas: 30000, // teraGas / gigaGas
  },
  attachedDeposit: {
    yoctoNear: 1, // near, milliNear
    // or
    // units: 1 // tokens
  },
});
```

#### Option 2

Cons

- Need to type the unit manually or import it (if we will add the const)
- Will have 2 different meaning to unit - as smallest part of the token and as type of value

```ts
functionCall({
  name: 'contract_method',
  gasLimit: {
    unit: 'Gas',
    value: 30000,
  },
  attachedDeposit: {
    unit: 'NEAR',
    value: 1,
  },
});

functionCall({
  name: 'contract_method',
  gasLimit: {
    unitType: 'tGas',
    amount: 300, // or quantity
  },
  attachedDeposit: {
    unitType: 'NEAR',
    amount: 1.5, // or quantity
  },
});
```

#### Option 3

Pros:

- Low boiler code
- No imports

Cons:

- Could be not clear what is gasLimit or nearDeposit

```ts
functionCall({
  name: 'contract_method',
  teraGasLimit: 300, // gasLimit
  yoctoNearDeposit: 1, // nearDeposit,
});
```

#### Option 4

Pros:

- Low boiler code
- No imports

Cons:

- Could be not clear what is gasLimit or unitDeposit

```ts
functionCall({
  name: 'contract_method',
  teraGasLimit: 300, // gasLimit
  unitDeposit: 1, // tokenDeposit
});
```

### Conclusions

As we can see above - there is no perfect solution.
Best 4 options (for my opinion)

```ts
// 1
functionCall({
  name: 'contract_method',
  gasLimit: { teraGas: 30000 },
  attachedDeposit: { near: 1.5 },
});

// 2
functionCall({
  name: 'contract_method',
  gasLimit: { teraGas: 30000 },
  attachedDeposit: { tokens: 1.5 },
});

// 3
functionCall({
  name: 'contract_method',
  teraGasLimit: 300, 
  tokenDeposit: 1.5,
});

// 4
functionCall({
  name: 'contract_method',
  gasLimit: teraGas(300),
  attachedDeposit: near(1.5),
});
```
