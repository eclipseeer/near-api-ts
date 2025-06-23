# Signer 
This module is responsible for signing various messages (hereafter “messages” refers to transactions, NEP413 messages, delegate actions, or anything else that needs to be signed). It does not handle constructing or sending transactions. At the same time, the module is also responsible for storing keys on any type of storage. In fact, it’s a blend of the old NAJ KeyStore and Signer.

Name options:
- Signer
- SignService

```ts
// Basic type  (just a list of methods for now, not a real signature!)
// Other methods are discussable
type Signer = {
  signTransaction: () => SignedTransaction,
  signDelegateAction: () => SignedDeletageAction,
}
```

### Questions

Q: Do we need a general-purpose sign method that can sign any message and does not perform any data transformations, but simply returns a byte array?
- Pros: It allows signing anything without having to worry about supporting new message types.
- Cons: The message being signed cannot be displayed to the user in a human-readable form (for example, in a wallet or on a ledger).

A: No, it will open an attack vector on the user

--- 

Q: Should we support signing an array of messages?
There are common scenarios where multiple messages need to be signed together. The advantage of such a function is that the user doesn’t have to figure out whether to sign messages sequentially or in parallel. Different signer implementations may have different constraints, and we can hide that complexity from the user.

A: 

---

Q: Should we embed a signMessage method at the Signer level?
NEP-413 specifies a way for wallets to sign authentication messages in the format:
```ts
interface SignMessageParams {
  message: string ; // The message that wants to be transmitted.
  recipient: string; // The recipient to whom the message is destined (e.g. "alice.near" or "myapp.com").
  nonce: [u8, 32]; // A nonce that uniquely identifies this instance of the message, denoted as a 32 bytes array (a fixed `Buffer` in JS/TS).
  callbackUrl?: string; // Optional, applicable to browser wallets (e.g. MyNearWallet). The URL to call after the signing process. Defaults to `window.location.href`.
  state?: string; // Optional, applicable to browser wallets (e.g. MyNearWallet). A state for authentication purposes.
}
```
However, the concept of a Signer does not imply a single account with a full-access key. A Signer is essentially a key storage + sign service. Therefore, to implement signMessage, we would need to introduce a wrapper around that generic structure, for example:

```ts
interface SignMessage {
  publicKey: string;
  nep413Message: {
    message: string;
    recipient: string;
    nonce: [u8, 32];
    callbackUrl?: string;
    state?: string;
  }
}
```
so that we know which key to use for signing. Is this acceptable?

A: 

--- 

### Signer Creation
Signer types:
- Private Key / Private Keys
- Seed Phrase / Seed Phrases
- Local Storage
- Session Storage
- IndexedDB
- OPFS
- File
- Wallet Selector
- MPC?
- Iframe?
- Others....?

The creation processes are fully independent of one another — different createSigner invocations will produce different signatures.

#### Options
```ts
// Options 1
const signer11 = createSignerFromSeedPhase({ // Not the best naming - must be shorter
  seedPhrase: 'treat nation deer relief warrior slot sand aim very solution faint sign',
  derevationPath: `m/44'/397'/0'/1'`,
});

const signer12 = createSignerFromLocalStorage({
  rootPath: 'my-app.nat-storage' // prefix for keys
});

// Option 2
const signer2 = signer.fromLocalStorage({
  rootPath: 'my-app.nat-storage'
});

// Option 3
const signer3 = createSignerFrom({ 
  type: 'localStorage', 
  rootPath: 'my-app.nat-storage'
});

// Option 4
const signer4 = createLocalStorageSigner({
  rootPath: 'my-app.nat-storage'
});
```


#### Questions


### Wallet Selector
To work with the Wallet Selector (WS), you’ll need to implement a special adapter that transforms function signatures. This should likely be a standalone function, separate from the Signer.

#### Questions

Should the Wallet Selector be treated as an implementation of Signer? Working with NAT requires an adapter, but conceptually WS offers more functionality than a typical SignService / Signer.

---

How should we handle DelegateAction? In WS, signDelegateAction exists only in the Ledger.

