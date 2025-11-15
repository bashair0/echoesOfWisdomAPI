import { clerkClient, getAuth, requireAuth } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { getAllCategories } from "./controllers/categoryController.ts";
import { db } from "./drizzle/db.ts";
import { CategoryTable, UserTable } from "./drizzle/schema.ts";
import { categoryRouter } from "./routes/categoryRouter.ts";
import { postRouter } from "./routes/postRouter.ts";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello, World!");
  
});

// Use requireAuth() to protect this route
// If user isn't authenticated, requireAuth() will redirect back to the homepage
app.get("/protected", requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req);

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  //const user = await clerkClient.users.getUser(userId)

  //return res.json({ user })
});



app.use("/posts", postRouter);
app.use("/categories", categoryRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})