//we use graphql-express package to wire express with graphql

const express = require("express");
const expressGraphQL = require('express-graphql');
const app = express();

//using graphql as a middleware
app.use("/graphql",expressGraphQL({
    graphiql:true, //development tool that makes us make query against our development server
    
}));


//graphql schema

//when making a schema you need to specify each property that the model has and all its relations to other models 
const graphql = require('graphql');

const {
    GraphQLObjectType, GraphQLInt, GraphQLString
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User", //required
    fields: { //also required
        id: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }
    }

})
//root query
//we need to provide graphql with a prop root query, to tell it how to find a specific user 

//we tell graphql, if we ask about user with argument id = some string, you'll look for the return a user based on UserType schema, 
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType", 
    fields: {
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){
               //this is the function that will get us the data
               //in args we will have access to id
               //here we should get data from db or from whatever store we have 

               //resolve accepts promises
            }
        }
    }
})

//and here's our schema 
const schema = new GraphQLSchema({
    query:RootQuery
})