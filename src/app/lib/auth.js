import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// MongoDB Atlas SRV DNS রেজোলিউশন ফিক্স (ISP/Windows ECONNREFUSED সমাধান)
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  // Ignore in environments where setting DNS is restricted
}

const client = new MongoClient(process.env.BETTER_AUTH_MONGO_URI);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db),
});