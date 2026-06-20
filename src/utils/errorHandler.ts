import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

const errorHandler = (err: Error, c: Context) => {
  if (err instanceof HTTPException) {
    console.log({ msg: err.message });

    return c.json({ msg: err.message }, err.status);
  }
  if (err instanceof ZodError) {
    console.log({ msg: err.issues.map((i) => i.message) });

    return c.json({ msg: err.issues.map((i) => i.message) }, 400);
  }
  console.log({ msg: "Internal server error" });

  return c.json({ msg: "Internal server error" }, 500);
};

export default errorHandler;
