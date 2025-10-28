import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const log = (data: unknown) =>
  console.dir(data, { depth: null, customInspect: true });

export const getFileBytes = async (
  relativePath: string,
): Promise<Uint8Array> => {
  const result = await readFile(
    path.join(path.dirname(fileURLToPath(import.meta.url)), relativePath),
  );
  return new Uint8Array(result);
};
