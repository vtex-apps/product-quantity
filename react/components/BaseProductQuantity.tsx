import React, { useCallback } from 'react'
import { NumericStepper } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { pathOr } from 'ramda'
import { useCssHandles } from 'vtex.css-handles'

export type NumericSize = 'small' | 'regular' | 'large'

export interface Props {
  dispatch: any
  selectedItem: any
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

  const availableQuantity = pathOr(
    0,
    ['sellers', 0, 'commertialOffer', 'AvailableQuantity'],
    selectedItem
  )
  const { unitMultiplier, measurementUnit } = selectedItem

  const showAvailable = availableQuantity <= warningQuantityThreshold

  if (availableQuantity < 1) return null

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
            measurementUnit !== DEFAULT_UNIT ? measurementUnit : undefined
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
