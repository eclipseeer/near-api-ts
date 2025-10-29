import { getSigningKeyPriority } from './helpers/getSigningKeyPriority';
import type {
  SignTransaction,
  TaskQueueContext,
} from 'nat-types/signers/memorySigner/taskQueue';
import type { SignedTransaction } from 'nat-types/signedTransaction';

export const createSignTransaction =
  (context: TaskQueueContext): SignTransaction =>
  async (transactionIntent) => {
    const { matcher, resolver } = context.signerContext;

    const task = {
      taskType: 'SignTransaction' as const,
      taskId: crypto.randomUUID(),
      signingKeyPriority: getSigningKeyPriority(transactionIntent),
      transactionIntent,
    };

    matcher.canHandleTaskInFuture(task);
    context.addTask(task);

    queueMicrotask(() => {
      matcher.handleAddTask(task);
    });

    return resolver.waitForTask<SignedTransaction>(task.taskId);
  };
