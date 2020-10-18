import { Storage } from "aws-amplify";

async function s3Get(key) {
  const stored = await Storage.vault.get(key);

  return stored;
}

export default s3Get;