import React, { useCallback } from 'react'
import { NumericStepper } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import useProduct from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'
import { pathOr } from 'ramda'
import styles from './styles.css'

const ProductQuantity: StorefrontFunctionComponent<Props> = ({
  warningQuantityThreshold = 0,
}) => {
  const { selectedQuantity, selectedItem } = useProduct()
  const { dispatch } = useProductDispatch()

  const onChange = useCallback(
    e => {
      dispatch({ type: 'SET_QUANTITY', args: { quantity: e.value }})
    },
    [dispatch]
  )

  const availableQuantity = pathOr(
    0,
    ['sellers', 0, 'commertialOffer', 'AvailableQuantity'],
    selectedItem
  )

  const showAvailable = availableQuantity <= warningQuantityThreshold

  if (availableQuantity < 1) return null

  return (
    <div className={`${styles.quantitySelectorContainer} flex flex-column mb4`}>
      <div className="mb3 c-muted-2 t-body">
        <FormattedMessage id="store/product-quantity.quantity" />
      </div>
      <NumericStepper
        size="small"
        value={selectedQuantity}
        minValue={1}
        maxValue={availableQuantity ? availableQuantity : undefined}
        onChange={onChange}
      />
      {showAvailable && (
        <div
          className={`${
            styles.availableQuantityContainer
          } mv4 c-muted-2 t-small`}>
          <FormattedMessage
            id="store/product-quantity.quantity-available"
            values={{ availableQuantity }}
          />
        </div>
      )}
    </div>
  )
}

interface Props {
  warningQuantityThreshold: number
}

ProductQuantity.defaultProps = {
  warningQuantityThreshold: 0,
}

ProductQuantity.schema = {
  title: 'admin/editor.product-quantity.title',
  description: 'admin/editor.product-quantity.description',
  type: 'object',
  properties: {
    warningQuantityThreshold: {
      title: 'admin/editor.product-quantity.warningQuantityThreshold.title',
      description:
        'admin/editor.product-quantity.warningQuantityThreshold.title',
      type: 'number',
      default: 0,
    },
  },
}

export default ProductQuantity
