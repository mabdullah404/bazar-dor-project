import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// MongoDB Atlas SRV DNS রেজোলিউশন ফিক্স (ISP/Windows ECONNREFUSED সমাধান)
try {
  dns.setDefaultResultOrder("ipv4first");
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  // Ignore in environments where setting DNS is restricted
}

let client;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(process.env.BETTER_AUTH_MONGO_URI);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(process.env.BETTER_AUTH_MONGO_URI);
}

const db = client.db("bazar-dor");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "production"
      ? "https://bazar-dor-project-omega.vercel.app"
      : "http://localhost:3000"),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET 
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  },
  database: mongodbAdapter(db, { client }),
});