declare module 'vtex.styleguide' {
  import { ComponentType } from 'react'

  export const NumericStepper: ComponentType<NumericStepperProps>
  export const Dropdown: ComponentType<DropdownProps>

  type NumericSize = 'small' | 'regular' | 'large'

  interface NumericStepperProps {
    size: NumericSize
    value: number
    minValue: number
    maxValue?: number
    unitMultiplier: number
    suffix?: string
    onChange: (e: any) => void
  }

  interface DropdownProps {
    id: string
    testId: string
    onChange: (e: Event) => void
    placeholder: string
    options: Array<{
      value: number
      label: string
    }>
    size: NumericSize
    value: number
  }
}
