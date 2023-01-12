import { AxiosResponse } from 'axios';
import { ApolloQueryResult } from 'apollo-client/core/types';
import { HTTPClient } from './HTTPClient';
import { GraphQLClient } from './GraphQLClient';

export type TApiResponse = AxiosResponse<any> | ApolloQueryResult<any>;

export interface IApiModule {
  http: HTTPClient;

  graphql: GraphQLClient;
}
