import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { auth } from "lib/auth.js";
import { metadataHandler } from "./routes/metadata.js";

const app = new Hono().basePath("/api");

app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

const routes = [metadataHandler] as const;
routes.forEach((route) => app.route("/", route));

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
