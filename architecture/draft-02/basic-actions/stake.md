# Action Creator - Stake
This action deletes signer's account and transfer remaining NEAR tokens to
a beneficiary account;

```ts
type Args = {
  beneficiaryId: AccountId // string
};

deleteAccount({ beneficiaryId });
```
