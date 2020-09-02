import ko from 'knockout';

ko.components.register('sut', {
  template: '<div id="bar-text" data-bind="text: text"></div>',
  viewModel(params) {
    this.text = 'BAR'
    this.params = params
  }
})
