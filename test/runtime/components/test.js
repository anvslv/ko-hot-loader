import fs from 'fs'
import path from 'path'
import { expect } from 'chai'
import webpack from 'webpack'
import DevServer from 'webpack-dev-server'
import webpackConfig from './webpack.config'
import nightmare from 'nightmare'

const compiler = webpack(webpackConfig)

describe('runtime/components', () => {
  const sutPath = path.resolve(__dirname, './sut.js')
  const fooPath = path.resolve(__dirname, './foo.js')
  const barPath = path.resolve(__dirname, './bar.js')
  const foo = fs.readFileSync(fooPath, 'utf8')
  const bar = fs.readFileSync(barPath, 'utf8')
  let browser, server

  before(() => {
    fs.writeFileSync(sutPath, foo)
    browser = nightmare()
    server = new DevServer(compiler, { hot: true, quiet: true, publicPath: 'http://localhost:8080/' })
    server.listen(8080)
  })

  after(() => {
    browser.end()
    server.close()
    fs.unlinkSync(sutPath)
  })

  it('should reload the component when it changes on disk', function() {
    this.timeout(30000)

    return browser
      .on('page', (type, message) => {
        if (type === 'error') {
          throw new Error(message)
        }
      })
      .goto('http://localhost:8080/test/runtime/components/')
      .wait('#foo-text')
      .evaluate(() => document.querySelector('#foo-text').innerHTML)
      .then((text) => {
        expect(text).to.equal('FOO')
      })
      .then(() => {
        fs.writeFileSync(sutPath, bar, 'utf8')
        return browser
          .wait('#bar-text')
          .evaluate(() => document.querySelector('#bar-text').innerHTML)
          .then((text) =>
            expect(text).to.equal('BAR'))
      })
      .catch((err) => console.error(err)) // eslint-disable-line
  })
})
