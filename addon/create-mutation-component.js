import Component from "@ember/component";
import hbs from "htmlbars-inline-precompile";
import { inject as service } from "@ember/service";

export default function createMutationComponent(config) {
  return Component.extend({
    apollo: service(),

    data: null,
    loading: false,

    layout: hbs`{{yield (hash
      mutate=(action "mutate")
      data=data
      loading=loading
    )}}`,

    actions: {
      async mutate(options) {
        this.set("loading", true);
        const res = await this.apollo.client.mutate({
          ...config,
          ...options
        });
        this.setProperties({ ...res, loading: false });
      }
    }
  });
}
