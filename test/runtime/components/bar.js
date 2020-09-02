import kr from '../../../src/registration';

kr.components.registerOrUpate('sut', {
  template: '<div id="bar-text" data-bind="text: text"></div>',
  viewModel(params) {
    this.text = 'BAR'
    this.params = params
  }
})
