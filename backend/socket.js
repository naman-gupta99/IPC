import socket from "socket.io";

let io;

const initSocket = server => {
  io = socket(server);

  const generateId = req => {
    return req._query.username;
  };

  io.engine.generateId = generateId;
};

const getIo = () => {
  return io;
};

export default { initSocket, getIo };
