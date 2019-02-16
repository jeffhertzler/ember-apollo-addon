import Service from '@ember/service';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { computed } from '@ember/object';

export default Service.extend({
  init() {
    this._super(...arguments);

    const client = this.createApolloClient();
    this.set('client', client);
  },

  cache: computed(() => new InMemoryCache()),
  link: computed(
    () =>
      new HttpLink({
        uri: '/graphql',
      })
  ),

  createApolloClient() {
    return new ApolloClient({
      link: this.get('link'),
      cache: this.get('cache'),
    });
  },

  client: null,
});
