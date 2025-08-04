import * as ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import App from "./App";
import "./index.css";

// HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: "https://patika.onrender.com/",
});

// WebSocket link for subscriptions (GraphQL Yoga v1 compatible)
const wsClient = new SubscriptionClient(
  "wss://patika.onrender.com/subscriptions",
  {
    reconnect: true,
    connectionParams: () => {
      return {};
    },
  }
);

const wsLink = new WebSocketLink(wsClient);

// Split link to route between HTTP and WebSocket
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
