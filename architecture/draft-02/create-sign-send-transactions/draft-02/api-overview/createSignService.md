# createSignService


|                                      | Memory | File | Local Storage | MPC | Ledger | Mobile Wallet |
|:-------------------------------------|:------:|:----:|:-------------:|:---:|:------:|:-------------:|
| Persistent storage                   |   -    |  +   |       +       |  +  |   +    |       +       |
| Can add and store more keys          |   +    |  +   |       +       | -+  |   -+   |       -       |
| Fast TX signing (< 0.1 sec)          |   +    |  +   |       +       |  -  |   -    |       -       |
| No need user action (click) for sign |   +    |  +   |       +       |  +  |   -    |       -       |
| Keys stored locally                  |   +    |  +   |       +       |  -  |   -    |       -       |
| Works with Derivation Path           |   -    |  -   |       -       |  +  |   +    |       -       |



## Questions

**Q**: Why do we allow the SignService to sign transactions? Wouldn’t it be better to have this only for the Signer?

**A**: The problem is that many respondents complained that the current process of creating a Signer is too cumbersome, and they would like a solution that works in a single line of code.

---

**Q**: How to separate sign services? By what criteria?
Maybe it makes sense to split them into 2 types:

Type 1
- Getting the list of keys is almost instant.
- No user permission needed to sign — the keys are already in memory.
- Fast transaction signing; easy to sign any number of transactions just by calling signTransaction multiple times.
- Creating a KeyPool does not require any user permissions.
- The keys from the pool can be stored in persistent storage (disk/SSD) (except memory) and reused on subsequent app launches.

Type 2
- No direct access to keys; 
- You need to send a message to some device/location and ask the user to sign the transaction.

**A**:

---

**Q**: Can you send many transactions at once?
Definitely not via the wallet. You will hit the payload size limit for URL or QR code.
For Ledger, there is obviously a maximum message size that can be transferred to memory at one time.

**A**:

---

**Q**: Should we name all key sources (seedPhase + derivation path, accountId + derivation path, etc.) as KeySource?

**A**:

