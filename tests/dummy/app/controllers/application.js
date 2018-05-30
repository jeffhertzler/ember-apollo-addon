import Controller from "@ember/controller";

export default Controller.extend({
  doQuery: true,

  actions: {
    toggle() {
      this.toggleProperty("doQuery");
    }
  }
});
