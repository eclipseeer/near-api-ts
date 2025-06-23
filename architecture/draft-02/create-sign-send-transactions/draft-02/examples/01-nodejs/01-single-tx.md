### Single signer - send single transaction

High level API

```ts
const client = createNearClient({ network: mainnet });

const signService = await createSignService({
  storageType: 'file',
  filePath: './env-keys.json',
});

/*
Optional - if you need to create multiple signers many times you can create a factory

const signerFactory = (signerId) => createSigner({
  signerId,
  client,
  signService,
})
*/

const signer = await createSigner({
  signerId: 'system.near',
  client,
  signService,
});

await signer.submitTransaction({
  intention: {
    action: transfer({ amount: { near: '2.5' } }),
    receiverId: 'alice.near',
  },
});
```

---

Low level API

```ts
const client = createNearClient({ network: mainnet });

const signService = await createSignService({
  storageType: 'file',
  filePath: './env-keys.json',
});

const signerId = 'system.near';
const signerPublicKey = 'ed25519:DzWozj4DXAq2AGSbG9L7KKpkct27iz61HytHKmah7C7M';

const { nonce, blockHash } = await client.getAccessKey({
  accountId: signerId,
  publicKey: signerPublicKey,
});

const { signedTransaction } = await signService.signTransaction({
  transaction: {
    signerId,
    signerPublicKey,
    action: transfer({ amount: { near: '2.5' } }),
    receiverId: 'alice.near',
    nonce: nonce + 1,
    blockHash,
  },
});

await client.sendTransaction({ signedTransaction });
```
