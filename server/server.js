const express = require("express");
const http = require("http");
const cors = require("cors");
const { initializeSocket } = require("./socket/socket");
const pollsRouter = require("./routes/poll.route"); // Import the polls route handler
const path = require("path"); // Add this line to import the path module

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

app.use(cors());
app.use(express.json());

app.use(
  "/api/polls",
  (req, res, next) => {
    req.io = io;
    next();
  },
  pollsRouter
);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
