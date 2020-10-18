import { API } from "aws-amplify";

export default async function getFiles(){
    return API.get("gameboard", `/gameboard`);
}