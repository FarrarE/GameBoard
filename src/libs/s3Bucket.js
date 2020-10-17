import { Storage } from "aws-amplify";

export async function s3Upload(file, type) {
  const filename = `${Date.now()}${type}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}