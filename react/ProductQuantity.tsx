import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

import BaseProductQuantity, { Props } from './components/BaseProductQuantity'

const ProductQuantity: StorefrontFunctionComponent<Props> = props => {
  const {
    warningQuantityThreshold,
    showLabel,
    showMeasurementUnit,
    size,
  } = props
  const { selectedItem, selectedQuantity } = useProduct()
  const dispatch = useProductDispatch()
  return (
    <BaseProductQuantity
      size={size}
      dispatch={dispatch}
      showLabel={showLabel}
      showMeasurementUnit={showMeasurementUnit}
      selectedItem={selectedItem}
      selectedQuantity={selectedQuantity}
      warningQuantityThreshold={warningQuantityThreshold}
    />
  )
}

ProductQuantity.schema = {
  title: 'admin/editor.product-quantity.title',
  description: 'admin/editor.product-quantity.description',
}

export default ProductQuantity
