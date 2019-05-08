import Apollo from 'ember-apollo-addon/services/apollo';
import Component from '@ember/component';
import debugLogger from 'ember-debug-logger';
import hbs from 'htmlbars-inline-precompile';
import isEqual from 'lodash.isequal';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { layout } from '@ember-decorators/component';

interface Query {
  apollo: Apollo;

  data: any;
  loading: boolean;
  networkStatus: any;

  _subscription: any;
  _query: any;
  _variables: any;

  fetchPolicy: string;
  meta: any;
  query: any;
  variables: any;

  updateQuery(previousResult: any, queryResult: any): any;
}

@layout(hbs`{{yield (hash
  data=data
  loading=loading
  networkStatus=networkStatus
  fetchMore=(action "fetchMore")
  refetch=(action "refetch")
)}}`)
class Query extends Component implements Query {
  @service apollo!: Apollo;

  debug = debugLogger();

  data;
  loading = true;
  networkStatus;

  _subscription;
  _query;
  _variables;

  fetchPolicy = 'cache';
  meta;
  query;
  variables;

  init() {
    super.init();

    this.debug('init!', this.meta);

    const { query, variables, fetchPolicy } = this;
    const _query = this.apollo.client.watchQuery({
      query,
      variables,
      fetchPolicy,
    });
    const _subscription = _query.subscribe({
      next: (result: any) => this.setProperties(result),
    });
    this.set('_variables', variables);
    this.set('_subscription', _subscription);
    this.set('_query', _query);
  }

  didUpdateAttrs() {
    this.debug('did update attrs!', this.meta);

    const { _variables, variables } = this;

    if (!isEqual(_variables, variables)) {
      this.debug(_variables, variables, this.meta);
      this.set('_variables', variables);
      this._query.refetch();
    }
  }

  willDestroyElement() {
    this.debug('will destroy!', this.meta);

    this._subscription.unsubscribe();
  }

  @action
  refetch(opts = {}) {
    this.debug('will destroy!', this.meta);

    const { query, variables, fetchPolicy, updateQuery } = this;
    this._query.refetch({
      query,
      variables,
      fetchPolicy,
      updateQuery,
      ...opts,
    });
  }

  @action
  fetchMore(opts = {}) {
    this.debug('fetch more!', this.meta);

    const { query, variables, fetchPolicy, updateQuery } = this;
    this._query.fetchMore({
      query,
      variables,
      fetchPolicy,
      updateQuery,
      ...opts,
    });
  }
}

export default Query;
