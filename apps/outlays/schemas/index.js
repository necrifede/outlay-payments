const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const ClientType = require("./types/ClientType");
const clients = require("../data/clients.json");

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

module.exports = schema;
