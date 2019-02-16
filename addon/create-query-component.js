import Component from "@ember/component";
import _ from "lodash";
import hbs from "htmlbars-inline-precompile";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default function createQueryComponent(config) {
  return Component.extend({
    apollo: service(),

    data: null,
    loading: null,
    networkStatus: null,

    _subscription: null,
    _query: null,

    variables: computed(() => config.variables),
    oldVariables: computed(() => config.variables),

    layout: hbs`{{yield data loading networkStatus}}`,

    fetchPolicy: computed(() => config.fetchPolicy),

    meta: computed(() => config.meta),

    setup() {
      console.log("setup!", this.meta);
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
      const variables = this.variables;
      const query = this.apollo.client.watchQuery({
        ...config,
        variables
      });
      const subscription = query.subscribe({
        next: result => this.setProperties(result)
      });
      this.set("_subscription", subscription);
    },

    init() {
      this._super(...arguments);
      console.log("init!", this.meta);
      this.setup();
    },

    didUpdateAttrs() {
      const oldVariables = this.oldVariables;
      const variables = this.variables;

      console.log(oldVariables, variables, this.meta);

      if (!_.isEqual(oldVariables, variables)) {
        this.setup();
      }
    },

    willDestroyElement() {
      console.log("will destroy!", this.meta);
      this._subscription.unsubscribe();
    }
  });
}
