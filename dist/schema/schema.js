"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: graphql_1.GraphQLString,
            resolve: () => 'User, welcome to GraphQL',
        },
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
});
