import Component from '@ember/component';
import _ from 'lodash';
import hbs from 'htmlbars-inline-precompile';
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
  @service apollo;

  data = null;
  loading = true;
  networkStatus = null;

  _subscription = null;
  _query = null;

  variables = {};
  _variables = {};

  fetchPolicy = 'cache';

  meta;

  setup() {
    console.log('setup!', this.meta);
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    const { query, variables, fetchPolicy, meta } = this;
    console.log(query, variables, fetchPolicy, meta);
    const _query = this.apollo.client.watchQuery({
      query,
      variables,
      fetchPolicy,
    });
    const _subscription = _query.subscribe({
      next: result => this.setProperties(result),
    });
    this.set('_variables', variables);
    this.set('_subscription', _subscription);
    this.set('_query', _query);
  }

  init() {
    super.init(...arguments);
    console.log('init!', this.meta);
    this.setup();
  }

  didUpdateAttrs() {
    const { _variables, variables } = this;

    if (!_.isEqual(_variables, variables)) {
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
