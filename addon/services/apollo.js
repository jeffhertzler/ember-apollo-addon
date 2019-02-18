import Service from '@ember/service';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { computed } from '@ember/object';

export default class Apollo extends Service {
  client = null;
  cache = new InMemoryCache();
  link = new HttpLink({ uri: 'graphql' });

  init() {
    this._super(...arguments);

    const client = this.createApolloClient();
    this.set('client', client);
  }

  createApolloClient() {
    return new ApolloClient({
      link: this.get('link'),
      cache: this.get('cache'),
    });
  }
}
