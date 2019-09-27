import socketio from "socket.io";

let io;

export const initSocket = server => {
  io = socketio(server);

  io.engine.generateId = req => {
    return req._query.u;
  };
};

export const getIO = () => io;