declare module 'vtex.styleguide' {
  import { ComponentType } from 'react'

  export const NumericStepper: ComponentType<NumericStepperProps>

  interface NumericStepperProps {
    size: 'small'
    value: number
    minValue: number
    maxValue?: number
    onChange: (e: any) => void
  }
}
