import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloQueryResult, OperationVariables } from 'apollo-client/core/types';
import { QueryOptions } from 'apollo-client/core/watchQueryOptions';
import { IGraphQLClient } from './IGraphQLClient';

// eslint-disable-next-line import/prefer-default-export
export class GraphQLClient implements IGraphQLClient {
  httpLink: HttpLink;

  errorLink: any;

  instance: ApolloClient<NormalizedCacheObject>

  constructor() {
    this.httpLink = new HttpLink({ uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index' });
    this.errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ));
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    });
    this.instance = new ApolloClient({
      link: this.errorLink.concat(this.httpLink),
      cache: new InMemoryCache(),
      connectToDevTools: true,
    });
  }

  query<T = any, TVariables = OperationVariables>(options: QueryOptions<TVariables>)
    : Promise<ApolloQueryResult<T>> {
    return this.instance.query(options);
  }
}
