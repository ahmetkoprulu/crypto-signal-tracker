import { Router } from "express";
import signal from "./routes/signal";
import formula from "./routes/formula";
import test from "./routes/test";

export default () => {
  const app = Router();
  signal(app);
  formula(app);
  test(app);

  return app;
};
