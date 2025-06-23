# createSigner

```ts
/*
1. We don't care which key is used to sign the transaction — let the signer decide on its own.
2. If not specified, we will use the FA key by default.
3. If there is no keyPool but there are multiple transactions — call them sequentially.
4. The signer manages the nonce internally.
*/

const signer1 = await createSigner({
  signerId: 'system.near',
  client,
  signService,
});


/*
1. When a keyPool is used, the execution order is not guaranteed when submitTransactions mode is in-parallel.
2. If there is an error with any transaction (e.g. network error, nonce error - not an execution error),
   add it to the end of the queue for retry.
*/
const signer2 = await createSigner({
  signerId: 'system.near',
  keyPool: {
    size: 3,
  },
  client,
  signService,
});
```

```ts
type keyPoolConfig = {
  maxPoolSize: number,
  oneTimeKeys: boolean, // create a new keys before each submitTranasction???
}
```

## Questions
Should keyPool be able to create or use FC keys? Or FA only?

---

What if we could create a one-time Key Pool for Ledger or Wallet Selector?

This somewhat reduces security, but improves convenience and speed in cases where you need to sign many transactions.
It sits somewhere between signing all transactions exclusively through the wallet (secure, but slow) and storing Full Access keys directly in the app (insecure, but fast).

--- 

Is there any sense in implementing splitting a large transaction into smaller chunks and combining them on the wallet side? For situations when a transaction is too large to be transferred over the transport layer (for example, via QR code). Are such situations even possible?

--- 

Key Pool for Ledger using Derivation Path?
In theory, an account can receive several keys using different derivation paths and add them to itself.
After that, knowing all the derivation paths, we could create a Key Pool from these keys.
But in practice, this is not efficient — even though the nonce will be independent between keys, the signing time will exceed the time needed to send and execute the transactions.

---

How to call transaction without signerId/signerPublicKey?

Intention or template, not transaction - we want to avoid misleading users






