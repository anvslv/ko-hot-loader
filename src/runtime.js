const ko = require('knockout')

const viewModels = {}

ko.components.register('ko-hot-loader-tmp', { template: '<span class="ko-hot-loader-tmp"></span>' })

class HotComponentViewmodel {
  constructor(id, name) {
    this.proxy = ko.observable(`${name}-hot`)
    this.params = ko.observable({})
  }
}

function reload(id, name, config) {
  viewModels[id].proxy('ko-hot-loader-tmp')
  ko.tasks.runEarly()

  if (ko.components.isRegistered(name)) {
    ko.components.unregister(name)
  }

  ko.components.register(name, config)
  viewModels[id].proxy(name)
}

module.exports = {
  proxy(id, name, config) {
    if (!viewModels[id]) {
      viewModels[id] = new HotComponentViewmodel(id, name)
    }

    reload(id, `${name}-hot`, config)

    return {
      viewModel: {
        createViewModel(params) {
          viewModels[id].params(params)
          return viewModels[id]
        }
      },
      template: '<span data-bind="component: { name: proxy, params: params }"></span>'
    }
  }
}
