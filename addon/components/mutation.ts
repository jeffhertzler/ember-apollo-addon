import Apollo from 'ember-apollo-addon/services/apollo';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import { layout } from '@ember-decorators/component';

@layout(hbs`{{yield (hash
  mutate=(action "mutate")
  data=data
  loading=loading
)}}`)
class Mutation extends Component {
  @service apollo!: Apollo;

  data: any;
  loading = false;
  mutation: any;

  @action
  async mutate(options: any) {
    this.set('loading', true);
    const res = await this.apollo.client.mutate({
      mutation: this.mutation,
      ...options,
    });
    this.setProperties({ ...res, loading: false });
  }
}

export default Mutation;
