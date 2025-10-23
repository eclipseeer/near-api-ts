import { tryOneRound } from '../3-tryOneRound/tryOneRound';
import { TransportError, hasTransportErrorCode } from '../../transportError';
import { safeSleep } from '@common/utils/sleep';
import { hasRpcErrorCode, RpcError } from '../../../rpcError';
import { combineAbortSignals } from '@common/utils/common';
import type {
  InnerRpcEndpoint,
  SendRequestContext,
} from 'nat-types/client/transport';
import type { Result } from 'nat-types/common';

const shouldTryAnotherRound = (
  result: Result<unknown, TransportError | RpcError>,
): boolean =>
  hasTransportErrorCode(result.error, [
    'Fetch',
    'AttemptTimeout',
    'ParseResponseToJson',
    'InvalidResponseSchema',
  ]) ||
  hasRpcErrorCode(result.error, [
    'ParseRequest',
    'MethodNotFound',
    'UnknownValidationError',
    'RpcTransactionTimeout',
  ]);

export const tryMultipleRounds = async (
  context: SendRequestContext,
  rpcs: InnerRpcEndpoint[],
): Promise<Result<unknown, TransportError | RpcError>> => {
  const { maxRounds, nextRoundDelayMs } = context.transportPolicy.failover;

  const round = async (roundIndex: number) => {
    const result = await tryOneRound(context, rpcs, roundIndex);

    const isLastRound = roundIndex >= maxRounds - 1;
    if (isLastRound || !shouldTryAnotherRound(result)) return result;

    const abortError = await safeSleep<TransportError>(
      nextRoundDelayMs,
      combineAbortSignals([
        context.externalAbortSignal,
        context.requestTimeoutSignal,
      ]),
    );

    if (abortError) {
      context.errors.push(abortError);
      return { error: abortError };
    }

    return round(roundIndex + 1);
  };

  return round(0);
};
