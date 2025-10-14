import { defineConfig } from "drizzle-kit";
import { db_URL } from "./config.ts";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: db_URL as string,
  },
  verbose: true,
  strict: true,
});
