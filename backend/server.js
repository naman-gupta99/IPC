import express from "express";
import path from "path";
import { initSocket } from "./app/socket";
import config from "./config";
import middleware from "./app/middleware";
import bootstrap from "./app/bootstrap";
import appRoutes from "./app/routes";

const app = express();
app.use(express.static(path.join(__dirname, "public")));

middleware(app);
appRoutes(app);
bootstrap();

initSocket(app.listen(config.app.port));
console.log(`Listening on port ${config.app.port} ...`);

export default app;
