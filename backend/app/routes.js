import user from "./routes/user/user";
import newUser from "./routes/user/newUser";
import alexa from "./routes/node-routes/alexa";
import gassistant from "./routes/node-routes/gassistant";

const router = app => {
  app.use("/user", user);
  app.use("/newUser", newUser);
  app.use("/alexa", alexa);
  app.use("/gassistant", gassistant);
};

export default router;
