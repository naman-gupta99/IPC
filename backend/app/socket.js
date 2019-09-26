import socket from "socket.io";

let io;

const initSocket = server => {
  io = socket(server);

  socket.engine.generateId = req => {
    console.log(req._query.username);
    return req._query.username;
  };
}

const getIO = () => {
  return io;
};

export default {
  initSocket,
  getIO
};
