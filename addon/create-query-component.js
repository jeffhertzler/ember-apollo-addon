import Component from '@ember/component';
import _ from 'lodash';
import hbs from 'htmlbars-inline-precompile';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default function createQueryComponent(config) {
  return Component.extend({
    apollo: service(),

    data: null,
    loading: true,
    networkStatus: null,

    _subscription: null,
    _query: null,

    variables: computed(() => config.variables),
    _variables: computed(() => config.variables),

    layout: hbs`{{yield (hash
      data=data
      loading=loading
      networkStatus=networkStatus
      fetchMore=(action "fetchMore")
      refetch=(action "refetch")
    )}}`,

    fetchPolicy: computed(() => config.fetchPolicy),

    meta: computed(() => config.meta),

    setup() {
      console.log('setup!', this.meta);
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
      const { variables } = this;
      const query = this.apollo.client.watchQuery({
        ...config,
        variables,
      });
      const subscription = query.subscribe({
        next: result => this.setProperties(result),
      });
      this.set('_variables', variables);
      this.set('_subscription', subscription);
      this.set('_query', query);
    },

    init() {
      this._super(...arguments);
      console.log('init!', this.meta);
      this.setup();
    },

    didUpdateAttrs() {
      const { _variables, variables } = this;

      if (!_.isEqual(_variables, variables)) {
        console.log(_variables, variables, this.meta);
        this.set('_variables', variables);
        this._query.refetch();
      }
    },

    willDestroyElement() {
      console.log('will destroy!', this.meta);
      this._subscription.unsubscribe();
    },

    actions: {
      refetch(opts = {}) {
        const { variables } = this;
        this._query.refetch({
          ...config,
          variables,
          ...opts,
        });
      },
      fetchMore(opts = {}) {
        const { variables } = this;
        this._query.fetchMore({
          ...config,
          variables,
          ...opts,
        });
      },
    },
  });
}
