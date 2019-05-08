import Apollo from 'ember-apollo-addon/services/apollo';
import Component from '@ember/component';
import debugLogger from 'ember-debug-logger';
import hbs from 'htmlbars-inline-precompile';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { layout } from '@ember-decorators/component';

interface Mutation {
  apollo: Apollo;

  data: any;
  loading: boolean;

  meta: any;
  mutation: any;
}

@layout(hbs`{{yield (hash
  mutate=(action "mutate")
  data=data
  loading=loading
)}}`)
class Mutation extends Component implements Mutation {
  @service apollo!: Apollo;

  debug = debugLogger();

  data: any;
  loading = false;

  meta: any;
  mutation: any;

  @action
  async mutate(options: any) {
    this.debug('mutate!', this.meta);

    this.set('loading', true);
    const res = await this.apollo.client.mutate({
      mutation: this.mutation,
      ...options,
    });
    this.setProperties({ ...res, loading: false });
  }
}

export default Mutation;
