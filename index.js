const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const clients = ["", ""];
var idx = 0;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
var user_count = 0;
var admin_socket_id;
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running " + user_count + " " + admin_socket_id);
});

io.on("connection", (socket) => {
  user_count += 1;
  clients[idx] = socket.id;
  idx = (idx + 1) % 2;
  //   console.log(user_count);
  socket.emit("me", socket.id);
  if (admin_socket_id) io.to(admin_socket_id).emit("newcomer", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("setAdmin", (socket_id) => {
    console.log("Set Admin", socket_id);
    admin_socket_id = socket_id;
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    let cc = userToCall;
    if (!userToCall) {
      if (from == clients[0]) cc = clients[1];
      else cc = clients[0];
    }
    io.to(cc).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
