const express = require("express");
// const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const app = express();
const clients = require("./data/clients.json");
const { graphqlHTTP } = require("express-graphql");

const port = 3002;

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLInt },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        mothersname: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryTypeCustomName",
    fields: {
        getAllClients: {
            type: new GraphQLList(ClientType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return clients;
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "MutationCutomName",
    fields: {
        createUser: {
            type: ClientType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                mothersname: { type: GraphQLString },
            },
            resolve(parent, { firstname, lastname, mothersname, ...args }) {
                const newUser = { id: clients.length + 1, firstname, lastname, mothersname };
                clients.push(newUser);
                return newUser;
            },
        },
    },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(port, () => console.log("Server running..."));
