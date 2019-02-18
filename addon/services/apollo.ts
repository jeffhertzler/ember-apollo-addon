import Service from '@ember/service';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default class Apollo extends Service {
  client: any;
  cache = new InMemoryCache();
  link = new HttpLink({ uri: 'graphql' });

  init() {
    this._super(...arguments);

    const client = this.createApolloClient();
    this.set('client', client);
  }

  createApolloClient() {
    return new ApolloClient({
      link: this.link,
      cache: this.cache,
    });
  }
}
