import { Router } from "express";
import signal from "./routes/signal";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  signal(app);

  return app;
};
