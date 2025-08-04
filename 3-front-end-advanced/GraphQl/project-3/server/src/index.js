import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers/index.js";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { pubsub } from "./pubsub.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = readFileSync(join(__dirname, "schema.graphql"), "utf8");

// Create GraphQL server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: (req) => {
    return {
      pubsub,
      request: req.request,
      connection: req.connection,
    };
  },
});

const PORT = process.env.PORT || 4000;

const options = {
  port: PORT,
  cors: {
    origin: "*",
    credentials: true,
  },
  subscriptions: {
    path: "/subscriptions",
    onConnect: (connectionParams, webSocket) => {
      console.log("WebSocket connected");
      return { pubsub };
    },
    onDisconnect: (webSocket, context) => {
      console.log("WebSocket disconnected");
    },
  },
};

server.start(options, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/subscriptions`);
  console.log(`🚀 GraphiQL available at http://localhost:${PORT}/`);
  console.log(`🚀 Try your subscriptions in GraphiQL!`);
});
