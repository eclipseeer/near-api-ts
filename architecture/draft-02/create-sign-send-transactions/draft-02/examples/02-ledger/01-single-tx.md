### Single signer - send single transaction - In Progress

High level API

```ts
const client = createNearClient({ network: mainnet });

const signService = await createSignService({
  storageType: 'ledger',
});

// const signer = await createSigner({
//   signerId: 'system.near',
//   client,
//   signService,
// });
//
// await signer.submitTransaction({
//   intention: {
//     action: transfer({ amount: { near: '2.5' } }),
//     receiverId: 'alice.near',
//   },
// });
```
