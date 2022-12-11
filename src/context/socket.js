import { createContext } from "react";

import TokenService from "services/tokenService";
import socketio from "socket.io-client";

import config from "../config";

const getSocket = async () => {
  const token = await TokenService.getAuthToken(); // get jwt token
  if (token) {
    return socketio(config.SERVER_URL, {
      query: { token },
    });
  }
  return socketio(config.SERVER_URL);
};

const socket = await getSocket();
socket.on("connect", () => {
  console.log("connected to backend");
});

const SocketContext = createContext();

export { socket, SocketContext };
