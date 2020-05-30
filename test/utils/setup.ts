import expect from 'expect'

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
