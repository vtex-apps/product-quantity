import React, { useCallback, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { DispatchFunction } from 'vtex.product-context/ProductDispatchContext'
import { ProductContext } from 'vtex.product-context'

import DropdownProductQuantity from './DropdownProductQuantity'
import InputProductQuantity from './InputProductQuantity'

export type NumericSize = 'small' | 'regular' | 'large'
export type SelectorType = 'input' | 'dropdown'

export interface BaseProps {
  dispatch: DispatchFunction
  selectedItem?: ProductContext['selectedItem']
  showLabel?: boolean
  selectedQuantity: number
  selectorType?: SelectorType
  size?: NumericSize
  warningQuantityThreshold: number
}

const CSS_HANDLES = [
  'quantitySelectorContainer',
  'quantitySelectorTitle',
  'availableQuantityContainer',
] as const

export type OnChangeCallback = {
  value: number
  selector?: BaseProps['selectorType']
}

const BaseProductQuantity: StorefrontFunctionComponent<BaseProps> = ({
  dispatch,
  selectedItem,
  size = 'small',
  showLabel = true,
  selectedQuantity,
  warningQuantityThreshold = 0,
  selectorType = 'input',
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [curSelector, setSelector] = useState(selectorType)
  const onChange = useCallback(
    (e: OnChangeCallback) => {
      dispatch({ type: 'SET_QUANTITY', args: { quantity: e.value } })

      if (e.selector) {
        setSelector(e.selector)
      }
    },
    [dispatch]
  )

  const availableQuantity =
    selectedItem?.sellers?.[0]?.commertialOffer?.AvailableQuantity ?? 0

  if (availableQuantity < 1 || !selectedItem) {
    return null
  }

  const showAvailable = availableQuantity <= warningQuantityThreshold

  return (
    <div
      className={`${handles.quantitySelectorContainer} flex flex-column mb4`}>
      {showLabel && (
        <div
          className={`${handles.quantitySelectorTitle} mb3 c-muted-2 t-body`}>
          <FormattedMessage id="store/product-quantity.quantity" />
        </div>
      )}
      {curSelector === 'input' ? (
        <InputProductQuantity
          size={size}
          unitMultiplier={selectedItem.unitMultiplier}
          measurementUnit={selectedItem.measurementUnit}
          selectedQuantity={selectedQuantity}
          availableQuantity={availableQuantity}
          onChange={onChange}
        />
      ) : null}
      {curSelector === 'dropdown' ? (
        <DropdownProductQuantity
          itemId={selectedItem.itemId}
          selectedQuantity={selectedQuantity}
          availableQuantity={availableQuantity}
          onChange={onChange}
          size={size}
        />
      ) : null}
      {showAvailable && (
        <div
          className={`${handles.availableQuantityContainer} mv4 c-muted-2 t-small`}>
          <FormattedMessage
            id="store/product-quantity.quantity-available"
            values={{ availableQuantity }}
          />
        </div>
      )}
    </div>
  )
}

export default BaseProductQuantity
