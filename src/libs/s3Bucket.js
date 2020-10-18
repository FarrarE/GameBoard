import { Storage } from "aws-amplify";

async function s3Upload(file, type, tag) {
  const filename = `${Date.now()}${tag}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: type,
  });

  return stored.key;
}

export default s3Upload;