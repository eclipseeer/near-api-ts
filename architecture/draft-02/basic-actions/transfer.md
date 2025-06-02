# Action Creator - Transfer (final)
This action transfer NEAR tokens from one account to another.

```ts
/**
 * required unitAmount || tokenAmount, if both - error;
 */

type Args = {
  unitAmount?: bigint | string;
  tokenAmount?: bigint | number | string;
}

transfer({ unitAmount: 1 });
transfer({ unitAmount: '100000000' });

transfer({ tokenAmount: 2.5 });
transfer({ tokenAmount: '2.5' });
transfer({ tokenAmount: 10n });
```
