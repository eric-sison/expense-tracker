import "dotenv/config";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { jwt, openAPI } from "better-auth/plugins";
import { oauthProvider } from "@better-auth/oauth-provider";
import { db } from "database/db.js";
import * as authSchema from "database/schemas/auth-schema.js";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
    usePlural: true,
  }),
  plugins: [
    openAPI(),
    jwt(),
    oauthProvider({
      loginPage: "http://localhost:5173/auth/login",
      consentPage: "http://localhost:5173/auth/consent",
      silenceWarnings: {
        oauthAuthServerConfig: true,
        openidConfig: true,
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
});
