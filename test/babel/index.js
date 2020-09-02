import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import { transformFileSync } from '@babel/core';

describe('ko-hot-loader babel preprocessor', () => {
  fs.readdirSync(__dirname).forEach((testName) => {
    const testDir = path.join(__dirname, testName)
    if (fs.statSync(testDir).isDirectory()) {
      it(testName, () => {
        const actual = transformFileSync(path.join(testDir, 'input.js')).code
        const expected = fs.readFileSync(path.join(testDir, 'output.js')).toString()
        expect(actual.trim()).to.equal(expected.trim())
      })  
    }
  })
})
