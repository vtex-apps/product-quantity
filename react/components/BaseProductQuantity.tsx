import React, { useCallback } from 'react'
import { NumericStepper } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { DispatchFunction } from 'vtex.product-context/ProductDispatchContext'
import { ProductContext } from 'vtex.product-context'

export type NumericSize = 'small' | 'regular' | 'large'

export interface Props {
  dispatch: DispatchFunction
  selectedItem?: ProductContext['selectedItem']
  showLabel?: boolean
  selectedQuantity: number
  size?: NumericSize
  warningQuantityThreshold: number
}

const CSS_HANDLES = [
  'quantitySelectorContainer',
  'quantitySelectorTitle',
  'quantitySelectorStepper',
  'availableQuantityContainer',
] as const

const DEFAULT_UNIT = 'un'

const BaseProductQuantity: StorefrontFunctionComponent<Props> = ({
  dispatch,
  selectedItem,
  size = 'small',
  showLabel = true,
  selectedQuantity,
  warningQuantityThreshold = 0,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const onChange = useCallback(
    e => {
      dispatch({ type: 'SET_QUANTITY', args: { quantity: e.value } })
    },
    [dispatch]
  )

  const availableQuantity =
    selectedItem?.sellers?.[0]?.commertialOffer?.AvailableQuantity ?? 0

  if (availableQuantity < 1 || !selectedItem) {
    return null
  }

  const { unitMultiplier, measurementUnit } = selectedItem

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
      <div className={handles.quantitySelectorStepper}>
        <NumericStepper
          size={size}
          minValue={1}
          unitMultiplier={unitMultiplier}
          suffix={
            measurementUnit && measurementUnit !== DEFAULT_UNIT
              ? measurementUnit
              : undefined
          }
          onChange={onChange}
          value={selectedQuantity}
          maxValue={availableQuantity || undefined}
        />
      </div>
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
