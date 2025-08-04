import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { PubSub } from "graphql-subscriptions";

import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/types/index.js";

const database = {
  users: [],
  messages: [],
};

const pubsub = new PubSub();

console.log("Creating schema...");

const schema = createSchema({
  typeDefs,
  resolvers,
});

console.log("Schema created successfully");

const yoga = createYoga({
  schema,
  context: { pubsub, database },
  graphqlEndpoint: "/",
  logging: {
    debug: (...args) => console.log(...args),
    info: (...args) => console.log(...args),
    warn: (...args) => console.warn(...args),
    error: (...args) => console.error(...args),
  },
});

const server = createServer(yoga);

// Create WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server,
  path: "/graphql",
});

useServer(
  {
    schema,
    context: () => ({ pubsub, database }),
  },
  wsServer
);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀  Server ready at http://localhost:${PORT}`);
  console.log(`🔗  WebSocket server ready at ws://localhost:${PORT}/graphql`);
});
