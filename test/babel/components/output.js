kr.components.registerOrUpate('FOO', require('ko-hot-loader').proxy(module.id, 'FOO', {
  template: '<div></div>',

  viewModel(params) {
    this.text = 'text';
    this.params = params;
  }

}));
module.hot && module.hot.accept(__webpack_require__.bind(null, module.id));
