```ts
type NonEmptyArray<T> = [T, ...T[]];

type Rpc = {
  url: string;
  type: 'regular' | 'archival';
  name?: string;
  headers?: {
    [name: string]: string;
  };
};

interface Network {
  rpcs: NonEmptyArray<Rpc>;
}

const network: Network = {
  rpcs: [
    {
      name: '213',
      url: '213',
      type: 'regular',
    },
  ],
};
// regular + archive?
```
