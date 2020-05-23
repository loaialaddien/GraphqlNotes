const graphql = require('graphql');
const _ = require('lodash');
const api = require('../apiHelpers')
const {
    GraphQLObjectType, GraphQLInt, GraphQLString,
    GraphQLSchema, GraphQLList, GraphQLNonNull
} = graphql;
const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: ()=>( {
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        employees :{ //since we will be referencing userType before its intiliztion, we just need to turn fields object into an arrow function
            type: new GraphQLList(UserType),
            resolve(parentValue,args){
                const{id} = parentValue;
                return api.getNestedById("companies",id,"users").then(res=>res.data);
            }
            
        }
    })
});
const UserType = new GraphQLObjectType({
    name: "User", //required
    fields: ()=>( { //also required
        id: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        company :{
            type:CompanyType, //resolve here is required, since what we will be getting is companyId and we want to get the company 
            resolve(parentValue,args){
                //parentValue will be the user
                const {companyId} = parentValue;
                return api.getById("companies",companyId).then(res=>res.data);
            }
        }
    })

});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType, // the type getting returned from the resolve function
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {
                const { id } = args;
                return api.getById("users", id).then(res => res.data);

            }
        },
        company :{
            type:CompanyType, 
            args:{
                id:{
                    type:GraphQLString
                }
            },
            resolve(parentValue,args){
                //parentValue will be the user
                const {id} = args;
                return api.getById("companies",id).then(res=>res.data);
            }
        }
    }
})

const mutationsQuery = new GraphQLObjectType({
     name:"Mutations",
     fields:()=>({
        addUser : {
            type:  UserType,
            args: {
                firstName:{type: new GraphQLNonNull(GraphQLString) }, // this is now required because we put graphqlNonNull
                age:{type: new GraphQLNonNull(GraphQLInt)},
                companyId:{type:GraphQLString}
            },
            resolve(parentValue,args){
                const {firstName,age,companyId} = args;
              return  api.post("users",{
                firstName,age,companyId
              }).then(res=>res.data);
            }
        },
        deleteUser : {
            type:  UserType,
            args: {
                id:{type: new GraphQLNonNull(GraphQLString) }, 
            },
            resolve(parentValue,args){
                const {id} = args;
              return  api.deleteModel("users",id).then(res=>res.data);
            }
        }
     })
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation : mutationsQuery
})
module.exports = schema;
