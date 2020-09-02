kr.components.registerOrUpate('FOO', {
  template: '<div></div>',
  viewModel(params) {
    this.text = 'text';
    this.params = params;
  }
});
