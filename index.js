const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
var user_count = 0;
var new_socket_id, old_socket_id;
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running " + user_count + " " + new_socket_id);
});

io.on("connection", (socket) => {
  user_count += 1;
  socket.emit("me", socket.id);
  if (user_count == 1) old_socket_id = socket.id;
  new_socket_id = socket.id;
  if (old_socket_id) io.to(old_socket_id).emit("newcomer", new_socket_id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
