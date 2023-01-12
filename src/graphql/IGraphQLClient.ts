import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloQueryResult, OperationVariables } from 'apollo-client/core/types';
import { QueryOptions } from 'apollo-client/core/watchQueryOptions';
import { HttpLink } from 'apollo-link-http';
import { TBuildQuery } from './TBuildQuery';

export interface IGraphQLClient {
  instance: ApolloClient<NormalizedCacheObject>;
  httpLink: HttpLink;
  errorLink: ApolloLink;
  buildQuery: TBuildQuery;
  query<T = any, TVariables = OperationVariables>(options: QueryOptions<TVariables>)
    : Promise<ApolloQueryResult<T>>;
}
