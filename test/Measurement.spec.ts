import { Measurement } from '../lib/Measurement'

describe('Measurement', () => {
  describe('getTextInMsecs', () => {
    it('Correctly sets precision', () => {
      const measurement = new Measurement(100.26)
      expect(measurement.getTextInMsecs(7)).toEqual('0.0001003 msecs')
    })

    it('Correctly sets default precision', () => {
      const measurement = new Measurement(100.26)
      expect(measurement.getTextInMsecs()).toEqual('0.000 msecs')
    })
  })
})
