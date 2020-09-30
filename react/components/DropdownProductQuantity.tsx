import React, { FunctionComponent, Fragment, useState } from 'react'
import { Dropdown, Input } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { SelectedItem } from 'vtex.product-context'

import { OnChangeCallback, BaseProps } from './BaseProductQuantity'

const MAX_DROPDOWN_VALUE = 10
const MAX_INPUT_LENGTH = 5

interface DropdownProps {
  itemId: SelectedItem['itemId']
  selectedQuantity: BaseProps['selectedQuantity']
  availableQuantity: number
  onChange: (e: OnChangeCallback) => void
  size: BaseProps['size']
}

const normalizeValue = (value: number, maxValue: number) =>
  value > maxValue ? maxValue : value

const validateValue = (value: string, maxValue: number) => {
  const parsedValue = parseInt(value, 10)

  if (Number.isNaN(parsedValue)) {
    return 1
  }

  return normalizeValue(parseInt(value, 10), maxValue)
}

const validateDisplayValue = (value: string, maxValue: number) => {
  const parsedValue = parseInt(value, 10)

  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return ''
  }

  return `${normalizeValue(parsedValue, maxValue)}`
}

const getDropdownOptions = (maxValue: number) => {
  const limit = Math.min(MAX_DROPDOWN_VALUE - 1, maxValue)
  const options = []

  for (let idx = 1; idx <= limit; ++idx) {
    options.push({ value: idx, label: `${idx}` })
  }

  if (maxValue >= MAX_DROPDOWN_VALUE) {
    options.push({
      value: MAX_DROPDOWN_VALUE,
      label: `${MAX_DROPDOWN_VALUE}+`,
    })
  }

  return options
}

const CSS_HANDLES = [
  'quantitySelectorDropdownMobileContainer',
  'quantitySelectorDropdownContainer',
  'quantitySelectorInputMobileContainer',
  'quantitySelectorInputContainer',
] as const

type InternalBehavior = 'dropdown' | 'input'

const DropdownProductQuantity: FunctionComponent<DropdownProps> = ({
  itemId,
  selectedQuantity,
  size = 'small',
  onChange,
  availableQuantity,
}) => {
  const [behavior, setInternalBehavior] = useState<InternalBehavior>('dropdown')
  const [curDisplayValue, setDisplayValue] = useState(`${selectedQuantity}`)

  const handles = useCssHandles(CSS_HANDLES)
  const dropdownOptions = getDropdownOptions(availableQuantity)

  const handleChange = (value: string) => {
    const validatedValue = validateValue(value, availableQuantity)
    const displayValue = validateDisplayValue(value, availableQuantity)

    if (
      behavior === 'dropdown' &&
      validatedValue >= Math.min(availableQuantity, MAX_DROPDOWN_VALUE)
    ) {
      setInternalBehavior('input')
    }

    setDisplayValue(displayValue)
    onChange({ value: validatedValue })
  }

  const handleInputBlur = () => {
    if (curDisplayValue === '') {
      setDisplayValue('1')
    }

    const validatedValue = validateValue(curDisplayValue, availableQuantity)

    if (validatedValue < Math.min(availableQuantity, MAX_DROPDOWN_VALUE)) {
      setInternalBehavior('dropdown')
    }

    onChange({ value: validatedValue })
  }

  if (behavior === 'dropdown') {
    return (
      <Fragment>
        <div
          className={`${handles.quantitySelectorDropdownMobileContainer} dn-m`}>
          <Dropdown
            id={`quantity-dropdown-mobile-${itemId}`}
            testId={`quantity-dropdown-mobile-${itemId}`}
            options={dropdownOptions}
            size={size}
            value={selectedQuantity}
            onChange={(event: any) => handleChange(event.target.value)}
            placeholder=" "
          />
        </div>
        <div className={`${handles.quantitySelectorDropdownContainer} dn db-m`}>
          <Dropdown
            id={`quantity-dropdown-${itemId}`}
            testId={`quantity-dropdown-${itemId}`}
            options={dropdownOptions}
            size={size}
            value={selectedQuantity}
            onChange={(event: any) => handleChange(event.target.value)}
            placeholder=" "
          />
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className={`${handles.quantitySelectorInputMobileContainer} dn-m`}>
        <Input
          id={`quantity-input-mobile-${itemId}`}
          size={size}
          value={curDisplayValue}
          maxLength={MAX_INPUT_LENGTH}
          onChange={(event: any) => handleChange(event.target.value)}
          onBlur={handleInputBlur}
          placeholder=""
        />
      </div>
      <div className={`${handles.quantitySelectorInputContainer} dn db-m`}>
        <Input
          id={`quantity-input-${itemId}`}
          size={size}
          value={curDisplayValue}
          maxLength={MAX_INPUT_LENGTH}
          onChange={(event: any) => handleChange(event.target.value)}
          onBlur={handleInputBlur}
          placeholder=""
        />
      </div>
    </Fragment>
  )
}

export default DropdownProductQuantity
