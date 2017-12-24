import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:githubToken"))["githubToken"]
  );

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
