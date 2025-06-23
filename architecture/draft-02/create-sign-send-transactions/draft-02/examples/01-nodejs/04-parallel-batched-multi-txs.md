### Single signer - send multiple transaction batches in parallel

High level API

Let's imagine the case:
We have 2 transaction batches (`B1`, `B2`), each of them contains 3 transactions. These transactions
must be sent sequentially, but batches is not dependent on each other
and can be sent in parallel. 

Also, we have 2 transactions (`X`, `Y`), which are independent, and can be sent 
in parallel.

We have a KeyPool with 5 keys, which allows us to send 5 transactions in the same time.
When we will run the code below, the send order will be the next:
`A, D, X, Y`. `B` will send after `A`, and `E` will send after `D`, no matter 
we have a 1 unused key at this moment.

```ts
const client = createNearClient({ network: mainnet });

const signService = await createSignService({
  storageType: 'file',
  filePath: './env-keys.json',
});

const signer = await createSigner({
  signerId: 'system.near',
  keyPool: {
    size: 5,
  },
  client,
  signService,
});

const action = transfer({ amount: { near: '1.25' } });

await Promise.all([
  // Batch B1
  signer.submitTransactions({
    intentions: [
      { action, receiverId: 'a.near' }, // Transaction A
      { action, receiverId: 'b.near' }, // Transaction B
      { action, receiverId: 'c.near' }, // Transaction C
    ],
  }),
  // Batch B2
  signer.submitTransactions({
    intentions: [
      { action, receiverId: 'd.near' }, // Transaction D
      { action, receiverId: 'e.near' }, // Transaction E
      { action, receiverId: 'f.near' }, // Transaction F
    ],
  }),
  signer.submitTransactions({
    inParallel: true,
    intentions: [
      { action, receiverId: 'x.near' },  // Transaction X
      { action, receiverId: 'y.near' },  // Transaction Y
    ],
  }),
]);
```

---

Option 2

Doesn't fit good - no clear benefits compare to the first option. Less readable,
can't call multiple submitTransactions, queue mechanism is not implemented in the signer

```ts
await signer.submitTransactions({
  batches: [
    {
      mode: 'in-parallel',
      intentions: [
        { action, receiverId: 'a.near' },
        { action, receiverId: 'b.near' },
        { action, receiverId: 'c.near' },
      ],
    },
    {
      intentions: [
        { action, receiverId: 'd.near' },
        { action, receiverId: 'e.near' },
        { action, receiverId: 'f.near' },
      ],
    },
  ],
});
```
