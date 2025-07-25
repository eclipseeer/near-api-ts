import { getBlockTarget } from '../utils.js';
import type { BlockTarget } from '@near-api-ts/types';
import type { ClientMethodContext } from '../../createClient';

// https://docs.near.org/api/rpc/protocol#protocol-config

type GetProtocolConfigArgs = {
  options?: BlockTarget;
};

// TODO use generated type
type GetProtocolConfigResult = object;

export type GetProtocolConfig = (
  args?: GetProtocolConfigArgs,
) => Promise<GetProtocolConfigResult>;

export const getProtocolConfig =
  ({ sendRequest }: ClientMethodContext): GetProtocolConfig =>
  ({ options } = {}) =>
    sendRequest({
      body: {
        method: 'EXPERIMENTAL_protocol_config',
        params: getBlockTarget(options),
      },
    });
