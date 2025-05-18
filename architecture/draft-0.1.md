```js
import { mainnet } from 'near-api-ts';

// Should we have a single client or split it on read/write clients?
const client = createNearClient({ network: mainnet });

// READ operations
const balance = await client.getAccountBalance({ accountId: 'alice.near' });
const block = await client.getBlock({ blockId: 12345 }); // Or blockHeight?
const gasPrice = await client.getGasPrice();

// Call contract view method
// By default we assume that a contract accept json args in snake_case format
const result = await client.callViewMethod({
  contractId: 'ft.alice.near',
  method: 'ft_balance_of',
  args: {
    accountId: 'alice.near',
  }, // Add implementation for borsh args methods - how user can select borsh args?
  transformTo: 'snake_case', // maybe need better name/API? 
});

// WRITE operations

const { transfer, functionCall } = actionCreators;

// What is signer? just a key or an account + key?
// Signer - option#1
const signerAlice = createSignerFromSeedPhase({ // Not the best naming - must be shorter
  accountId: 'alice.near',
  seedPhrase: 'treat nation deer relief warrior slot sand aim very solution faint sign',
  derevationPath: `m/44'/397'/0'/1'`,
});

// High level method which create, sign and send transaction
await client.submitTransaction({
  signer: signerAlice,
  action: transfer({ amount: 1.5 }),
  receiverId: 'bob.near',
});

// Signer - option#2
const signerBob = createSignerFromLocalStorage({
  accountId: 'bob.near',
  publicKey: 'ed25519:CZUCNM3HaLcuhha6m5y8DFfMDKCiSNmAwkFADZjku959',
});

await client.submitTransaction({
  signer: signerBob,
  actions: [
    functionCall({
      method: 'ft_transfer',
      args: {
        receiverId: 'alice.near',
        amount: '100000000000000000',
      },
      transformTo: 'snake_case', // or better name? Need to handle borsh based args
      tGas: 100,
      yoctoDeposit: 1,
    }),
  ],
  receiverId: 'ft.alice.near',
});

// Manual creating, signing and sending the transaction

const signerId = 'bob.near';
const signerPublicKey = 'ed25519:CZUCNM3HaLcuhha6m5y8DFfMDKCiSNmAwkFADZjku959';

const { nonce, blockHash } = prepareTransactionDetails({ // need better name
  signerId,
  signerPublicKey,
})

const transaction = createTransaction({
  signerId,
  signerPublicKey,
  actions: [transfer({ amount: 2.5 })],
  receiverId: 'alice.near',
  nonce, // optional
  blockHash, // optional
});

const { transactionHash, signedTransaction } = signer.signTransaction({ transaction });

await client.sendTransaction({ signedTransaction });
```
