import { API } from "aws-amplify";

export default function updateFile(boardState, id) {
    return API.put("gameboard", `/gameboard/${id}`, {
      body: boardState
    });
}