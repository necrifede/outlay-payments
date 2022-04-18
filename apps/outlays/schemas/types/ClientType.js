const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLInt },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        mothersname: { type: GraphQLString },
    }),
});

module.exports = ClientType;
