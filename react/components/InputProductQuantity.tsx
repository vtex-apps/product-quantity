import React, { FunctionComponent } from 'react'
import { NumericStepper } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { SelectedItem } from 'vtex.product-context'

import { OnChangeCallback, BaseProps } from './BaseProductQuantity'

const DEFAULT_UNIT = 'un'

interface InputProps {
  unitMultiplier: SelectedItem['unitMultiplier']
  measurementUnit: SelectedItem['measurementUnit']
  selectedQuantity: BaseProps['selectedQuantity']
  availableQuantity: number
  onChange: (e: OnChangeCallback) => void
  size: BaseProps['size']
}
const CSS_HANDLES = ['quantitySelectorStepper'] as const

const InputProductQuantity: FunctionComponent<InputProps> = ({
  unitMultiplier = 1,
  measurementUnit = DEFAULT_UNIT,
  size = 'small',
  selectedQuantity,
  availableQuantity,
  onChange,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.quantitySelectorStepper}>
      <NumericStepper
        size={size}
        minValue={1}
        unitMultiplier={unitMultiplier}
        suffix={measurementUnit !== DEFAULT_UNIT ? measurementUnit : undefined}
        onChange={onChange}
        value={selectedQuantity}
        maxValue={availableQuantity || undefined}
      />
    </div>
  )
}

export default InputProductQuantity
