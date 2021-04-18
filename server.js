import express from "express";
import prisma from "@prisma/client";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import fetch from "node-fetch";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import megaSeed from "./controllers/megaSeed.js";
<<<<<<< HEAD
// import megaProviderSeed from "./controllers/megaProviderSeed.js";
=======
import megaProviderSeed from "./controllers/megaProviderSeed.js";
import megaCreditSeed from "./controllers/megaCreditSeed.js";
>>>>>>> 47d821d40af2680073e644710fbc656ace011c4d

async function startApolloServer() {
  const app = express();
  const db = new prisma.PrismaClient({
    log: ["info", "warn"],
    errorFormat: "pretty",
  });

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req }) => ({ req }),
  });

  //Middleware
  // app.set("trust proxy", true);

  const whitelist = [
    "https://studio.apollographql.com",
    "http://localhost:3000",
    "http:localhost:4025/graphql",
  ];

  // Disable until depolyment, ill create a check later ---Sean
  const corsOptions = {
    origin: whitelist,
    credentials: true,
  };
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(
    cookieSession({
      name: "cookie",
      signed: false,
      secure: false,
      httpOnly: false,
    }),
  );

  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: false });
  await new Promise((resolve) => app.listen({ port: 4025 }, resolve));
  console.log(`
    Server is running
    Listening on port 4025
    http://localhost:4025/graphql
    studio.apollographql.com/dev`);
  return { server, app };
}


/* megaSeed();
megaCreditSeed();
megaProviderSeed(); */
startApolloServer();
/* iterateThroughPages(); */
