import * as z from 'zod/mini';
import { RpcGasPriceResponseSchema } from '@near-js/jsonrpc-types';
import { yoctoNear } from '../../../helpers/nearToken';
import type {
  CreateGetGasPrice,
  GetGasPriceResult,
  GetGasPriceArgs,
} from 'nat-types/client/methods/protocol/getGasPrice';
import { BlockIdSchema } from '@common/schemas/zod/common';
import type { BlockHash, BlockHeight } from 'nat-types/common';

const transformResult = (result: unknown): GetGasPriceResult => {
  const valid = RpcGasPriceResponseSchema().parse(result);

  return {
    gasPrice: yoctoNear(valid.gasPrice),
  };
};

const GetGasPriceArgsSchema = z.optional(
  z.object({
    blockId: z.optional(BlockIdSchema),
  }),
);

const getBlockId = (
  atMomentOf?: GetGasPriceArgs['atMomentOf'],
): BlockHeight | BlockHash | null => {
  if (atMomentOf === 'LatestOptimisticBlock') return null;
  if (atMomentOf && 'blockHash' in atMomentOf) return atMomentOf.blockHash;
  if (atMomentOf && 'blockHeight' in atMomentOf) return atMomentOf.blockHeight;
  return null;
};

export const createGetGasPrice: CreateGetGasPrice =
  ({ sendRequest }) =>
  async (args) => {
    GetGasPriceArgsSchema.parse(args);

    const result = await sendRequest({
      method: 'gas_price',
      params: {
        block_id: getBlockId(args?.atMomentOf),
      },
      transportPolicy: args?.policies?.transport,
      signal: args?.options?.signal,
    });

    return transformResult(result);
  };
