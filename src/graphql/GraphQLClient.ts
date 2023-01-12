import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloQueryResult, OperationVariables } from 'apollo-client/core/types';
import { QueryOptions } from 'apollo-client/core/watchQueryOptions';
import gql from 'graphql-tag';
import { IGraphQLClient } from './IGraphQLClient';
import { TBuildQuery } from './TBuildQuery';

export class GraphQLClient implements IGraphQLClient {
  httpLink: HttpLink;

  errorLink: ApolloLink;

  instance: ApolloClient<NormalizedCacheObject>;

  buildQuery: TBuildQuery;

  constructor() {
    this.buildQuery = gql;

    // TODO @lepyavko.d - replace with process.env variable
    this.httpLink = new HttpLink({ uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index' });

    // TODO @lepyavko.d - add some global error handler
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
