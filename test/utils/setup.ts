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

  toHavePercentageDifference(
    actual: number,
    expectedBaseNumber: number,
    expectedPercentageDifference: number
  ) {
    const difference = Math.abs(actual - expectedBaseNumber)
    const percentageDifference = (difference * 100) / expectedBaseNumber
    const pass = percentageDifference <= expectedPercentageDifference

    if (pass) {
      return {
        message: () =>
          `expected ${actual} to differ from ${expectedBaseNumber} no less than by ${expectedPercentageDifference}%, but real difference was ${percentageDifference.toFixed(
            1
          )}%`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${actual} to differ from ${expectedBaseNumber} no more than by ${expectedPercentageDifference}%, but real difference was ${percentageDifference.toFixed(
            1
          )}%`,
        pass: false,
      }
    }
  },
})
