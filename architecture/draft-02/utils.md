## toTokens

Util, which convert units to tokens.

```ts
type ToTokens = (args: {
  units: bigint | string;
  desimals?: bigint; // default - 24
}) => string;

toTokens({ units: '12345600000', desimals: 10n }); // '1.23456'
toTokens({ units: 1n }); // '0.000000000000000000000001'
```

## toUnits

Util, which convert tokens to units.

```ts
type ToUnits = (args: {
  tokens: bigint | number | string;
  desimals?: bigint; // default - 24
}) => string;

toUnits({ tokens: '15', desimals: 8n }); // '1500000000'
toUnits({ tokens: 1.5 }); // '1500000000000000000000000'
toUnits({ tokens: 5n, desimals: 16n }); // '50000000000000000'
```
