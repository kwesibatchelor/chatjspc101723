var express = require("express");
const { listen } = require("socket.io");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
users = [];
connections = [];
server.listen(3000);
app.get("/", function (req, res) {
    //route for localhost:3000/
    res.sendFile(__dirname + "/index.html");
})

io.sockets.on("connection", function (socket) {
    // when client connects to server
    connections.push(socket); // add plug details to custom array
    console.log("connected : %s socket connected", connections.length); //current connetions 
    socket.on("disconnect", function (data) {
        // client disconnect from server
        connections.splice(connections.indexOf(socket), 1); // delete plug details 
        console.log("Disconnected : %s socket connected", connections.length); //current connections
    });
    socket.on("send message", function (data) {
        console.log(data);
        io.sockets.emit("new message", { msg: data });
    });
});

console.log('server is listening')