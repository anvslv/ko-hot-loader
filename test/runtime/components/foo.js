require('knockout').components.register('sut', {
  template: '<div id="foo-text" data-bind="text: text"></div>',
  viewModel(params) {
    this.text = 'FOO'
    this.params = params
  }
})
