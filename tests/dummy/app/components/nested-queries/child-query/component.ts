import Component from '@ember/component';
import fragment from './fragment';
import { computed } from '@ember-decorators/object';
import { filter } from 'graphql-anywhere';

export default class ChildQuery extends Component {
  data: any;

  @computed('data')
  get filteredData() {
    console.log(this.data);
    return filter(fragment, this.data);
  }
}
