import { GraphQLServer} from 'graphql-yoga';
import { resolvers, pubsub } from "./graphql/resolvers";

const server = new GraphQLServer({ typeDefs : "src/graphql/schema.graphql", resolvers, context: {pubsub} })

server.start(() => console.log('Server is running on localhost:4000'))
