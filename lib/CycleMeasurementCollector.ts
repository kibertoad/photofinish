import { Measurement } from './Measurement'

export type CycleMeasurements = {
  samples: number[]

  mean: Measurement
}

export class CycleMeasurementCollector {}
