import { BorshSchema as b, /*Infer, Unit*/ } from 'borsher';

// const publicKey = b.Enum({})

const transactionSchema = b.Struct({
  signerId: b.String,
  // publicKey: this.PublicKey,
  nonce: b.u64,
  receiverId: b.String,
  blockHash: b.Array(b.u8, 32),
  // actions: { array: { type: this.Action } },
})



export const schema = {
  transactionSchema,
}
