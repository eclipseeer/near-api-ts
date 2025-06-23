# Single signer - sequentially send multiple transactions

## High level API

```ts
const client = createNearClient({ network: mainnet });

const signService = await createSignService({
  storageType: 'file',
  filePath: './env-keys.json',
});

const signer = await createSigner({
  signerId: 'system.near',
  signerPublicKey: 'ed25519:2igDuGDHPjNVYh6NoREwMYJy3tSF6bfQpvHD56cDimVv',
  client,
  signService,
});

await signer.submitTransactions({
  intentions: [
    { action: transfer({ amount: { near: '1.25' } }), receiverId: 'olly.near' },
    {
      actions: [
        functionCall({
          name: 'storage_deposit',
          gasLimit: { teraGas: '10' },
          attachedDeposit: { near: '0.00125' },
        }),
        functionCall({
          name: 'ft_transfer',
          gasLimit: { teraGas: '20' },
          attachedDeposit: { yoctoNear: 1n },
        }),
      ],
      receiverId: 'olly-contract.near',
    },
  ],
});
```

---

### Low level API

Not recommended unless you have a good reason to avoid the high-level way

```ts
const client = createNearClient({ network: mainnet });

const signService = await createSignService({
  storageType: 'file',
  filePath: './env-keys.json',
});

const signerId = 'system.near';
const signerPublicKey = 'ed25519:2igDuGDHPjNVYh6NoREwMYJy3tSF6bfQpvHD56cDimVv';

const { nonce, blockHash } = await client.getAccessKey({
  accountId: signerId,
  publicKey: signerPublicKey,
});

const intentions = [
  { action: transfer({ amount: { near: '1.25' } }), receiverId: 'olly.near' },
  {
    actions: [
      functionCall({
        name: 'storage_deposit',
        gasLimit: { teraGas: '10' },
        attachedDeposit: { near: '0.00125' },
      }),
      functionCall({
        name: 'ft_transfer',
        gasLimit: { teraGas: '20' },
        attachedDeposit: { yoctoNear: 1n },
      }),
    ],
    receiverId: 'olly-contract.near',
  },
];

for (let i = 0; i < intentions.length; i++) {
  const signedTransaction = await signService.signTransaction({
    transaction: {
      ...intentions[i],
      signerId,
      signerPublicKey,
      nonce: nonce + i + 1,
      blockHash,
    },
  });
  await client.sendTransaction({ signedTransaction });
}
```
