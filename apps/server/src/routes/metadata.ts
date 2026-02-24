import { auth } from "@/lib/auth.js";
import { Hono } from "hono";

export const metadataHandler = new Hono()
  .get("/.well-known/openid-configuration", async (c) => {
    const oidcMetadata = await auth.api.getOpenIdConfig();
    return c.json(oidcMetadata);
  })
  .get("/.well-known/oauth-authorization-server/api/auth", async (c) => {
    const oauthMetadata = await auth.api.getOAuthServerConfig();
    return c.json(oauthMetadata);
  });
