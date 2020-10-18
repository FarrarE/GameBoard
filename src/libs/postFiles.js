import { API } from "aws-amplify";

export default function postFiles(boardState) {
    return API.post("gameboard", "/gameboard", {
      body: boardState
    });
}