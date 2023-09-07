import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: GraphQLString,
            resolve: () => 'User, welcome to GraphQL',
        },
    },
});

export const schema = new GraphQLSchema({
    query: RootQuery,
});