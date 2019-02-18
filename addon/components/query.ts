import Apollo from 'ember-apollo-addon/services/apollo';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';
import isEqual from 'lodash.isequal';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import { layout } from '@ember-decorators/component';

@layout(hbs`{{yield (hash
  data=data
  loading=loading
  networkStatus=networkStatus
  fetchMore=(action "fetchMore")
  refetch=(action "refetch")
)}}`)
class Query extends Component {
  @service apollo!: Apollo;

  data: any;
  loading = true;
  networkStatus: any;

  _subscription: any;
  _query: any;

  variables = {};
  _variables = {};

  fetchPolicy = 'cache';
  meta: any;
  query: any;

  updateQuery() {}

  init() {
    super.init();
    const { query, variables, fetchPolicy } = this;
    console.log('init!', this.meta);
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
    const { _variables, variables } = this;

    if (!isEqual(_variables, variables)) {
      console.log(_variables, variables, this.meta);
      this.set('_variables', variables);
      this._query.refetch();
    }
  }

  willDestroyElement() {
    console.log('will destroy!', this.meta);
    this._subscription.unsubscribe();
  }

  @action
  refetch(opts = {}) {
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
    const { query, variables, fetchPolicy, updateQuery } = this;
    console.log(updateQuery);
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
