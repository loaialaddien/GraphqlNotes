const express = require("express");
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema')
const app = express();

app.use("/graphql",expressGraphQL({
    graphiql:true, //development tool that makes us make query against our development server
    schema
}));
app.listen(4000,()=>{
    console.log("listening")
});

