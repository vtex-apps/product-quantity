import React, { useCallback } from 'react'
import { NumericStepper } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { pathOr, isEmpty } from 'ramda'
import styles from './styles.css'

const noop = () => {}

const ProductQuantity: StorefrontFunctionComponent<Props> = ({
  warningQuantityThreshold = 0,
  ...props
}) => {
  const valuesFromContext = React.useContext(ProductContext)

  const isContextEmpty = !valuesFromContext || isEmpty(valuesFromContext)

  const onChangeCallback = isContextEmpty
    ? props.onChange || noop
    : valuesFromContext.onChangeQuantity

  const onChange = useCallback(
    e => {
      onChangeCallback(e.value)
    },
    [onChangeCallback]
  )

  const availableQuantity = isContextEmpty
    ? props.availableQuantity != null
      ? props.availableQuantity
      : 0
    : pathOr(
        0,
        ['selectedItem', 'sellers', 0, 'commertialOffer', 'AvailableQuantity'],
        valuesFromContext
      )

  const selectedQuantity = isContextEmpty
    ? props.selectedQuantity
    : valuesFromContext.selectedQuantity

  const showAvailable = availableQuantity <= warningQuantityThreshold

  if (availableQuantity < 1) return null

  return (
    <div className={`${styles.quantitySelectorContainer} flex flex-column mb4`}>
      <div className="mb3 c-muted-2 t-body">
        <FormattedMessage id="store/product-details.quantity" />
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
            id="store/product-details.quantity-available"
            values={{ availableQuantity }}
          />
        </div>
      )}
    </div>
  )
}

interface Props {
  selectedQuantity: number
  availableQuantity: number
  onChange: (e: any) => void
  warningQuantityThreshold: number
}

ProductQuantity.defaultProps = {
  warningQuantityThreshold: 0,
  onChange: () => {},
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
