const port = 8000;
const httpServer = require("http").createServer((req, res) => {}).listen(port);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const users = new Map();  // Mapping of socket.id to user information

io.on("connection", (socket) => {
    console.log("New connection: " + socket.id);

    socket.on("user connected", username => {
        users.set(socket.id, { id: socket.id, username: username });
        updateUserList();
    });

    socket.on("private message", ({ content, to }) => {
        const fromUser = users.get(socket.id);
        if (fromUser && users.has(to)) {
            io.to(to).emit("private message", { content, from: socket.id });
            console.log(`Message from ${fromUser.username} to ${to}: ${content}`);
        }
    });

    socket.on("disconnect", () => {
        users.delete(socket.id);
        updateUserList();
        console.log(`User disconnected: ${socket.id}`);
    });
});

function updateUserList() {
    io.emit("users", Array.from(users.values()));
}
module.exports = [ io, httpServer ];