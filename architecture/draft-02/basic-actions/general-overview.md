## FAQ

Q: Why do we use a function call instead of passing the object?
For example:

```ts
const transaction1 = {
  action: functionCall({
    name: 'init',
    gasLimit: { teraGas: '30' },
  }),
};

const transaction2 = {
  action: {
    type: 'FunctionCall',
    name: 'init',
    gasLimit: { teraGas: '30' },
  },
};
```
A: Writing 'FunctionCall' every time is error-prone and takes more time and 
more boilerplate code.

---

