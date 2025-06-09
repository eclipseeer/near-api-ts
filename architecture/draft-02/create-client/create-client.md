# Near Client (in progress)

Idea: add field 'node_type' to the 'status' RPC method.

```ts
// 1. Use the default option from package.
// Problem - data could be outdated.
const client = createNearClient({ network: mainnet });
```

```ts
// 2. Configure the client manually;
const network = {
  rpcs: [ // or regular + + archive separate lists?
    {
      url: 'https://fastnear.com',
      name: 'FastNEAR',
      type: 'regular',
    },
    {
      url: 'https://lava.com',
      name: 'Lava',
      type: 'regular',
    },
  ],
  balancerMode: 'sequential',
};

const client = createNearClient({ network, logger: 'info' });
```
