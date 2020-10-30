// 1.0 Apollo Client

import ApolloClient from "apollo-boost";

const client = new ApolloClient ({
    uri: "http://localhost:4000/",
})

export default client;
