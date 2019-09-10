import user from "./routes/user/user";
import newUser from "./routes/user/newUser";

const router = app => {
  app.use("/user", user);
  app.use("/newUser", newUser);
};

export default router;
