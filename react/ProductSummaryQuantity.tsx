import React from 'react'
import BaseProductQuantity from './components/BaseProductQuantity'
import { useCssHandles } from 'vtex.css-handles'
import { useProductSummaryDispatch, useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

const CSS_HANDLES = ['summaryContainer'] as const

const ProductSummaryQuantity: StorefrontFunctionComponent<Props> = ({
  warningQuantityThreshold
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { selectedItem, selectedQuantity } = useProductSummary()
  const dispatch = useProductSummaryDispatch()
  return (
    <div onClick={e => {
      e.preventDefault()
      // Stop propagation so it doesn't trigger the Link component above
      e.stopPropagation()
    }}
      className={`${handles.summaryContainer} center mw-100`}>

      <BaseProductQuantity
        warningQuantityThreshold={warningQuantityThreshold}
        selectedItem={selectedItem}
        selectedQuantity={selectedQuantity}
        dispatch={dispatch}
      />
    </div>
  )
}

interface Props {
  warningQuantityThreshold: number
}

ProductSummaryQuantity.schema = {
  title: 'admin/editor.product-quantity.title',
  description: 'admin/editor.product-quantity.description',
}

export default ProductSummaryQuantity