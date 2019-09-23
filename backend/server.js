import express from "express";
import path from "path";
import config from "./config";
import middleware from "./app/middleware";
import bootstrap from "./app/bootstrap";
import appRoutes from "./app/routes";
import socketFuncs from "./socket";

const app = express();
app.use(express.static(path.join(__dirname, "public")));

socketFuncs.initSocket(app.listen(config.app.port));

middleware(app);
appRoutes(app);
bootstrap();

console.log(`Listening on port ${config.app.port} ...`);

export default app;
