// 1.0 Apollo Client

import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory"
import { WebSocketLink } from "apollo-link-ws"

const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/",
    options: {
        reconnect: true,
    },
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: wsLink
})

export default client;
