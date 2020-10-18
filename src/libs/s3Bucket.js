import { Storage } from "aws-amplify";

async function s3Upload(file, type) {
  const filename = `${Date.now()}${"map"}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: type,
  });

  return stored.key;
}

export default s3Upload;