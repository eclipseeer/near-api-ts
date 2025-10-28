import { GenesisAccount, Sandbox } from 'near-sandbox';

export const startSandbox = async () =>
  await Sandbox.start({
    version: '2.8.0',
    config: {
      rpcPort: 4560,
      additionalAccounts: [GenesisAccount.createDefault('nat')],
    },
  });

export const withSandbox = async (
  fn: (args: { rpcUrl: string }) => Promise<void>,
) => {
  const sandbox = await startSandbox();
  try {
    await fn({ rpcUrl: sandbox.rpcUrl });
  } catch (e) {
    throw e;
  } finally {
    await sandbox.stop();
  }
};
