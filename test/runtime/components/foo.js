import kr from '../../../src/registration';

kr.components.registerOrUpate('sut', {
  template: '<div id="foo-text" data-bind="text: text"></div>',
  viewModel(params) {
    this.text = 'FOO'
    this.params = params
  }
})
