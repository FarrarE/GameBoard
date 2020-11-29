import { Storage } from "aws-amplify";
import updateFile from './updateFile';

export default async function deleteFiles(id, boardState, key) {
    const stored = {
        db: null,
        s3: null
    }

    stored.db = await updateFile(boardState, id);
    stored.s3 = await Storage.vault.remove(key);
    return stored;
}