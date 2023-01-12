import { IApiModule } from './IApiModule';
import { HTTPClient } from './HTTPClient';
import { GraphQLClient } from './GraphQLClient';

export class ApiModule implements IApiModule {
  http: HTTPClient;

  graphql: GraphQLClient;

  constructor() {
    this.http = new HTTPClient();
    this.graphql = new GraphQLClient();
  }
}
