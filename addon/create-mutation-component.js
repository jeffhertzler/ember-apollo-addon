import Component from "@ember/component";
import hbs from "htmlbars-inline-precompile";
import { inject as service } from "@ember/service";

export default function createMutationComponent(config) {
  return Component.extend({
    apollo: service(),

    data: null,
    loading: false,

    layout: hbs`{{yield (action "mutate") data loading}}`,

    actions: {
      mutate(options) {
        this.set("loading", true);
        return this.apollo.client
          .mutate(Object.assign({}, config, options))
          .then(resp =>
            this.setProperties(
              Object.assign({}, resp, {
                loading: false
              })
            )
          );
      }
    }
  });
}
