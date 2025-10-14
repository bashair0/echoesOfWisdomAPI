import { drizzle } from "drizzle-orm/node-postgres";
import { db_URL } from "../../config.ts";
import * as schema from "./schema.ts";

// You can specify any property from the node-postgres connection options
export const db = drizzle({
  schema,
  connection: {
    connectionString: db_URL!,
    /* ssl: true, */
  },
});
