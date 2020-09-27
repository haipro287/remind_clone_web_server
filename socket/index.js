const Server = require("socket.io");

let io;
exports.listen = (httpServer) => {
  io = new Server(httpServer);
  io.on("connection", (socket) => {
    socket.send("socket.io setup success");
  });
};
