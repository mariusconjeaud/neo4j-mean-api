const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server-azure-functions");
const { makeAugmentedSchema } = require("neo4j-graphql-js");
const neo4j = require("neo4j-driver");

const typeDefs = fs
  .readFileSync(
    path.join(__dirname, "schema.graphql")
  )
  .toString("utf-8");

const schema = makeAugmentedSchema({
    typeDefs
});

const driver = neo4j.driver(
    process.env.NEO4J_URL,
    neo4j.auth.basic(
        process.env.NEO4J_USERNAME,
        process.env.NEO4J_PASSWORD
    )
);

const server = new ApolloServer({
    context: { driver },
    schema: schema,
    introspection: true,
    playground: true
  });

module.exports = server.createHandler();