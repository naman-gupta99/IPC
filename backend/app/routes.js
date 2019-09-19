import user from "./routes/user/user";
import newUser from "./routes/user/newUser";
import alexa from "./routes/node-routes/alexa";

const router = app => {
  app.use("/user", user);
  app.use("/newUser", newUser);
  app.use("/alexa", alexa);
};

export default router;
