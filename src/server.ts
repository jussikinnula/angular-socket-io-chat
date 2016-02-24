import path = require("path");
import http = require("http");
import express = require("express");
import serveStatic = require("serve-static");
import socketIo = require("socket.io");

const port: number = process.env.PORT || 5000;

let app: express.Express = express();
let server = http["Server"](app);
let root = path.join(path.resolve(__dirname, "../public/"));
let router: express.Router = express.Router();
let io = socketIo(server);

router.get("/", (request: express.Request, result: express.Response) => {
    result.sendFile(path.join(root, "index.html"));
});

app.use("/styles.css", serveStatic(path.resolve(root, "styles.css")));
app.use("/client.js", serveStatic(path.resolve(root, "client.js")));
app.use("/vendor.js", serveStatic(path.resolve(root, "vendor.js")));
app.use("*", router);

server.listen(port, (error: any) => {
    if (error) {
        console.log(error);
    }
    console.log("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});

io.on("connection", (socket: any) => {
    console.log("*** Client connected");
    let nickname = "unknown";
    socket.on("disconnect", () => {
        console.log("*** Client disconnected");
        io.emit("message", "* " + nickname + " left channel");
    });
    socket.on("register", (newNickname: any) =>  {
        nickname = newNickname;
        io.emit("message", "* " + nickname + " joined channel");
    });
    socket.on("message", (message: any) =>  {
        // Just relay all messages to everybody
        io.emit("message", message);
        // Logging
        console.log(message);
    });
});
