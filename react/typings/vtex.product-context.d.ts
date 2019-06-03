declare module 'vtex.product-context' {
  import { Context } from 'react'

  export const ProductContext: Context<ProductContext>

  interface ProductContext {
    onChangeQuantity: (quantity: number) => void
    selectedQuantity: number
    selectedItem: {
      sellers: {
        commertialOffer: {
          AvailableQuantity: number
        }
      }[]
    }
  }
}
