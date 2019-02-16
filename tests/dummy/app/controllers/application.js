import Controller from "@ember/controller";

export default Controller.extend({
  doQuery: true,

  fetchMore1: {
    updateQuery(previousResult, { fetchMoreResult }) {
      return {
        hello: [...previousResult.hello, ...fetchMoreResult.hello]
      };
    }
  },

  fetchMore2: {
    updateQuery(previousResult, { fetchMoreResult }) {
      return {
        goodbye: [...previousResult.goodbye, ...fetchMoreResult.goodbye]
      };
    }
  },

  actions: {
    toggle() {
      this.toggleProperty("doQuery");
    }
  }
});
