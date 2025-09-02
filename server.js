const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New client connected ✅");

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
    ws.send(`Server says: ${msg}`); // echo back
  });

  ws.on("close", () => {
    console.log("Client disconnected ❌");
  });
});

// serve a simple homepage
app.get("/", (req, res) => {
  res.send("WebSocket server is running ✅");
});

// listen on Glitch/Heroku port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
