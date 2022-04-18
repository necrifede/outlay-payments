const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas");

const port = 3002;

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(port, () => console.log("Server running..."));
