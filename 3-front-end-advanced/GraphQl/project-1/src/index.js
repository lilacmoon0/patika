const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const data = require("../assets/data.json");
const resolvers = require("./graphql/resolvers");

const typeDefs = gql(fs.readFileSync(path.join(__dirname, "./graphql/schema.graphql"), "utf8")); 


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
