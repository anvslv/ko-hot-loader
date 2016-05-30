require('./sut')

window.onbeforeunload = () => {
  throw new Error('SHOULD NOT DO A FULL PAGE RELOAD')
}

require('domready')(() => require('knockout').applyBindings())
