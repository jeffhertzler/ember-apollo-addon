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

    setup() {
      let subscription = this.get("_subscription");
      if (subscription) {
        subscription.unsubscribe();
      }
      const variables = this.get("variables");
      const query = this.get("apollo.client").watchQuery({
        ...config,
        variables
      });
      subscription = query.subscribe({
        next: result => this.setProperties(result)
      });
      this.set("_subscription", subscription);
    },

    init() {
      this._super(...arguments);
      this.setup();
    },

    didReceiveAttrs() {
      const oldVariables = this.get("oldVariables");
      const variables = this.get("variables");

      if (!_.isEqual(oldVariables, variables)) {
        this.setup();
      }
    },

    willDestroyElement() {
      this.get("subscription").unsubscribe();
    }
  });
}
