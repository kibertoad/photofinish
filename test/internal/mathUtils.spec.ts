import { calculateMean, filterSignificantSamples } from '../../lib/internal/mathUtils'

describe('mathUtils', () => {
  describe('getSignificantSamples', () => {
    it('calculates significant samples correctly', () => {
      const samples = [1, 4, 5, 6, 4, 4, 4, 4, 4, 5, 6, 5, 6, 10, 1111, 2222]

      const significantSamples = filterSignificantSamples(samples)

      expect(significantSamples).toMatchSnapshot()
    })
  })

  describe('getSampleMean', () => {
    it('calculates mean correctly', () => {
      const samples = [1, 4, 5, 6, 4, 4, 4, 4, 4, 10, 1111, 99999]

      const mean = calculateMean(samples)

      expect(mean).toMatchSnapshot()
    })
  })
})
