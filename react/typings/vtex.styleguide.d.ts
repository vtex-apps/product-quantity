declare module 'vtex.styleguide' {
  import { ComponentType } from 'react'

  export const NumericStepper: ComponentType<NumericStepperProps>

  type NumericSize = 'small' | 'regular' | 'large'

  interface NumericStepperProps {
    size: NumericSize
    value: number
    minValue: number
    maxValue?: number
    unitMultiplier: number
    measurementUnit: string
    showMeasurementUnit: boolean
    onChange: (e: any) => void
  }
}
