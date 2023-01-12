import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import gql from 'graphql-tag';

const httpLink = new HttpLink({ uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index' });
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ));
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const EXAMPLE_QUERY = gql`
  query getAllFilms {
    allFilms {
      films {
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
            homeworld {
              name
            }
          }
        }
      }
    }
  }
`;

const FILM_QUERY = gql`
  query getFilm($id: ID!) {
    film(id: $id) {
      created
      director
      edited
      episodeID
      id
    }
  }
`;

export {
  apolloClient,
  EXAMPLE_QUERY,
  FILM_QUERY,
};
