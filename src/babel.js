import template from 'babel-template'
import generate from 'babel-generator'

function isKoComponentRegistration({ object, property }) {
  return object && property && object.object && object.property &&
    object.property.name  === 'components'  &&
    property.name         === 'register'
}

module.exports = () => ({
  visitor: process.env.NODE_ENV === 'production'
    ? {}
    : {
      ObjectExpression(path) {
        if (path.parent && path.parent.callee && isKoComponentRegistration(path.parent.callee)) {
          const n = path.parent.arguments[0].value
          const c = generate(path.parent.arguments[1]).code
          if (n !== 'ko-hot-loader-tmp') {
            path.replaceWithSourceString(`require('ko-hot-loader').proxy(module.id, '${n}', ${c})`)
          }
        }
      },
      Program: {
        exit({ node }) {
          node.body.push(template(
            'module.hot && module.hot.accept(__webpack_require__.bind(null, module.id))'
          )())
        }
      }
    }
})
