import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloQueryResult, OperationVariables } from 'apollo-client/core/types';
import { QueryOptions } from 'apollo-client/core/watchQueryOptions';
import { HttpLink } from 'apollo-link-http';

export interface IGraphQLClient {
  instance: ApolloClient<NormalizedCacheObject>;
  httpLink: HttpLink;
  errorLink: unknown;
  query<T = any, TVariables = OperationVariables>(options: QueryOptions<TVariables>)
    : Promise<ApolloQueryResult<T>>;
}
