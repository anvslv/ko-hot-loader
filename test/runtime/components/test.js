import fs from 'fs'
import path from 'path'
import { expect } from 'chai'
import webpack from 'webpack'
import DevServer from 'webpack-dev-server'
import webpackConfig from './webpack.config'
import { chromium } from 'playwright' 

const compiler = webpack(webpackConfig)

describe('runtime/components', () => {
  const sutPath = path.resolve(__dirname, './sut.js')
  const fooPath = path.resolve(__dirname, './foo.js')
  const barPath = path.resolve(__dirname, './bar.js')
  const foo = fs.readFileSync(fooPath, 'utf8')
  const bar = fs.readFileSync(barPath, 'utf8')
  let browser, page, server

  before(async () => {
    fs.writeFileSync(sutPath, foo)

    browser = await chromium.launch({ 
      ignoreDefaultArgs: ['--disable-extensions'], 
      headless: true,
      args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--single-process'
      ]
    })
    page = await browser.newPage()

    server = new DevServer(compiler, { hot: true, quiet: true, publicPath: 'http://localhost:8080/' })
    server.listen(8080)
  })

  after(async () => {
    await browser.close()
    server.close()
    fs.unlinkSync(sutPath)
  })

  it('should reload the component when it changes on disk', async () => {
    try { 
      await page.goto(
        'http://localhost:8080/test/runtime/components/', 
        { waitUntil: 'networkidle0' })
    

      await page.waitForSelector('#foo-text')

      let text = await page.$eval('#foo-text', element => {
          return element.innerHTML
      })
  
      expect(text).to.equal('FOO')

      fs.writeFileSync(sutPath, bar, 'utf8')
  
      await page.waitForSelector('#bar-text')

      text = await page.$eval('#bar-text', element => {
          return element.innerHTML
      })
  
      expect(text).to.equal('BAR')

      fs.writeFileSync(sutPath, foo, 'utf8')
  
      await page.waitForSelector('#foo-text')

      text = await page.$eval('#foo-text', element => {
          return element.innerHTML
      })
  
      expect(text).to.equal('FOO') 
    } catch (err){     
        throw new Error(err.message)      
    };
 
  }).timeout(100000000)
})
