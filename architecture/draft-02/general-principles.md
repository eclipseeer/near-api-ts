## Tokens and Units Convention

In our system, a token is a digital asset that consists of smaller indivisible parts called units.

Each token is defined by the number of decimal places (i.e. digits after the decimal point),
which determines how many units make up one whole token.

### Key Definitions:

- Token: The base digital asset, e.g. MyToken.
- Unit: The smallest indivisible part of a token (like “cents” in USD).
- Decimals: The number of digits after the decimal point used to represent the token.

  For example, if a token has 6 decimals, then 1 token = 1,000,000 units.

### Examples:

If MyToken has 6 decimals:

- 1 MyToken = 1,000,000 units
- 0.000001 MyToken = 1 unit
- 2.5 MyToken = 2,500,000 units

Real-World Analogy:

- 1 dollar = 100 cents

### Format

For this reason, we will use the tokens ⇄ units definition every time we need
to define the amount of tokens we want to operate with.

```ts
toUnits({ tokens: '10.25', desimals: 8 });

payment: { tokens: '12.5' }

amount: { units: '1' }
```

Also, we avoid using ambiguous values like `amount: '1'` to prevent possible errors.

## Named arguments
In all functions, we will use the pattern of named function arguments.

```ts
// With named arguments
functionCall({ number: 1, hash: 'b12335dasd', signerId });

// Without named arguments
functionCall(1, 'b12335dasd', 'alice.near');
```

Pros:
- Significantly improves readability and understanding of which parameter 
corresponds to what (especially in JS);
- Allows you not to worry about the order of arguments;
- Makes it easier to modify the function signature.
- 

Cons:
- Slightly increases the verbosity of the code.
