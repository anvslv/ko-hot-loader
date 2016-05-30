ko.components.register('FOO', require('ko-hot-loader').proxy(module.id, 'FOO', {
  template: '<div></div>'
}));
module.hot && module.hot.accept(__webpack_require__.bind(null, module.id));
