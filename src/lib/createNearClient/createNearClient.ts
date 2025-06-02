type CreateNearClientFn = (args: { network: object }) => void;


export const createNearClient: CreateNearClientFn = ({ network }) => {
  console.log(network);
};
