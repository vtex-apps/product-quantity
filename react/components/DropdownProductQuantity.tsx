import React, { FunctionComponent, Fragment } from 'react'
import { Dropdown } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { SelectedItem } from 'vtex.product-context'

import { OnChangeCallback, BaseProps } from './BaseProductQuantity'

const MAX_DROPDOWN_VALUE = 10

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
] as const

const DropdownProductQuantity: FunctionComponent<DropdownProps> = ({
  itemId,
  selectedQuantity,
  size = 'small',
  onChange,
  availableQuantity,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const dropdownOptions = getDropdownOptions(availableQuantity)

  const handleDropdownChange = (value: string) => {
    const validatedValue = validateValue(value, availableQuantity)

    let selector: BaseProps['selectorType']

    if (validatedValue >= Math.min(availableQuantity, MAX_DROPDOWN_VALUE)) {
      selector = 'input'
    }

    onChange({ value: validatedValue, selector })
  }
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
          onChange={(event: any) => handleDropdownChange(event.target.value)}
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
          onChange={(event: any) => handleDropdownChange(event.target.value)}
          placeholder=" "
        />
      </div>
    </Fragment>
  )
}

export default DropdownProductQuantity
