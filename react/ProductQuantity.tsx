import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'
import BaseProductQuantity from './components/BaseProductQuantity'

const ProductQuantity: StorefrontFunctionComponent<Props>  = ({
  warningQuantityThreshold
}) => {
  const { selectedItem, selectedQuantity } = useProduct()
  const dispatch = useProductDispatch()
  return (
    <BaseProductQuantity
      warningQuantityThreshold={warningQuantityThreshold}
      selectedItem={selectedItem}
      selectedQuantity={selectedQuantity}
      dispatch={dispatch}
    />
  )
}

interface Props {
  warningQuantityThreshold: number
  selectedQuantity: number
  selectedItem: any
  dispatch: any
}

export default ProductQuantity
