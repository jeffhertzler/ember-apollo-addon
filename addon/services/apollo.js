import ApolloClientObj from "npm:apollo-client";
import ApolloLinkObj from "npm:apollo-link";
import HttpLinkObj from "npm:apollo-link-http";
import InMemoryCacheObj from "npm:apollo-cache-inmemory";
import Service from "@ember/service";
import { computed } from "@ember/object";

const { ApolloClient } = ApolloClientObj;
const { ApolloLink } = ApolloLinkObj;
const { HttpLink } = HttpLinkObj;
const { InMemoryCache } = InMemoryCacheObj;

export default Service.extend({
  init() {
    this._super(...arguments);

    const client = this.createApolloClient();
    this.set("client", client);
  },

  cache: computed(() => new InMemoryCache()),
  link: computed(
    () =>
      new HttpLink({
        uri: "https://us-west-2.api.scaphold.io/graphql/graphql-world?"
      })
  ),

  createApolloClient() {
    return new ApolloClient({
      link: this.get("link"),
      cache: this.get("cache")
    });
  },

  client: null
});
