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
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(
  "/api/polls",
  (req, res, next) => {
    console.log("Sdsd")
    req.io = io;
    next();
  },
  pollsRouter
);

const indexPath = path.join(__dirname, '../client/dist/index.html');

app.get("/", (req, res) => {
  console.log("Sdsdsds")

  res.sendFile(indexPath);
});


const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
