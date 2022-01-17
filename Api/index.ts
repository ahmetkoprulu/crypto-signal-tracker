import { Router } from "express";
import signal from "./routes/signal";
import formula from "./routes/formula";

export default () => {
  const app = Router();
  signal(app);
  formula(app);

  return app;
};
