import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import {onError} from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
        console.log('networkError', networkError);
    }
})

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BASE_GRAPHQL_API
})

const link  = from([errorLink, httpLink])

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
})


