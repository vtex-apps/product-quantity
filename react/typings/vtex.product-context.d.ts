declare module 'vtex.product-context' {
  import { Context } from 'react'

  export const ProductContext: Context<ProductContext>

  interface ProductContext {
    state: {
      selectedQuantity: number
    }
    selectedItem: {
      sellers: {
        commertialOffer: {
          AvailableQuantity: number
        }
      }[]
    }
    dispatch (payload: { type: string, args?: any }): void
  }
}
