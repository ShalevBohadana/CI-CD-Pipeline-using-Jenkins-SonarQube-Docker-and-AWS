import { ClientSession, startSession } from 'mongoose';

export type UseTry<T> = (session: ClientSession) => Promise<T>;
export type UseCatch = (error: Error) => Promise<void>;

export const useDbTransaction = async <T>(
  tryFn: UseTry<T>,
  catchFn?: UseCatch
): Promise<T> => {
  const session = await startSession();
  session.startTransaction();

  try {
    const result = await tryFn(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    if (catchFn && error instanceof Error) {
      await catchFn(error);
    }
    throw error;
  } finally {
    await session.endSession();
  }
};