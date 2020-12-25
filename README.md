# photofinish
[![NPM Version][npm-image]][npm-url]
![](https://github.com/kibertoad/photofinish/workflows/ci/badge.svg)
[![Coverage Status](https://coveralls.io/repos/kibertoad/photofinish/badge.svg?branch=master)](https://coveralls.io/r/kibertoad/photofinish?branch=master)

Benchmarking library for Node.js that emphasizes convenience of use

## Install

```sh
$ npm install --save photofinish
```

## Usage

```js
import { BenchmarkBuilder } from 'photofinish'

expect.extend({
  toBeAround(actual: number, expected: number, precision = 2) {
    const pass = Math.abs(expected - actual) < Math.pow(10, -precision) / 2
    if (pass) {
      return {
        message: () => `expected ${actual} not to be around ${expected}`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${actual} to be around ${expected}`,
        pass: false,
      }
    }
  },
})

describe('benchmarkExecutioner', () => {
  describe('sync function under test', () => {
    it('benchmarks sync function correctly', () => {
      const testFn = () => {}

      const benchmarkBuilder = new BenchmarkBuilder()
      const benchmark = benchmarkBuilder
        .benchmarkName('noop')
        .warmupCycles(500)
        .benchmarkCycles(44)
        .benchmarkCycleSamples(55)
        .functionUnderTest(testFn)
        .build()

      const benchmarkResult = benchmark.execute()
      expect(benchmarkResult.meanTime).toBeInstanceOf(Measurement)
      // @ts-ignore
      expect(benchmarkResult.meanTime.getTimeInMilliSeconds()).toBeAround(0, 1)
    })
  })

  describe('async function under test', () => {
    it('benchmarks async function correctly', async () => {
      const testAsyncFn = async () => {
        return asyncDelay(100)
      }

      const benchmarkBuilder = new BenchmarkBuilder()
      const benchmark = benchmarkBuilder
        .benchmarkName('Delay 100 msecs')
        .warmupCycles(2)
        .benchmarkCycles(5)
        .benchmarkCycleSamples(5)
        .asyncFunctionUnderTest(testAsyncFn)
        .build()

      const benchmarkResult = await benchmark.executeAsync()
      expect(benchmarkResult.meanTime).toBeInstanceOf(Measurement)
      // @ts-ignore
      expect(benchmarkResult.meanTime.getTimeInMilliSeconds()).toBeAround(100, 0)
    })
  })
})
```

[npm-image]: https://img.shields.io/npm/v/photofinish.svg
[npm-url]: https://npmjs.org/package/photofinish
[downloads-image]: https://img.shields.io/npm/dm/photofinish.svg
[downloads-url]: https://npmjs.org/package/photofinish
[circleci-image]: https://circleci.com/gh/kibertoad/photofinish.svg?style=svg
[circleci-url]: https://circleci.com/gh/kibertoad/photofinish
