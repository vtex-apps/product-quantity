declare module 'vtex.product-context/useProduct' {
  const useProduct: () => ProductContext
  export default useProduct

  interface ProductContext {
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

declare module 'vtex.product-context/ProductDispatchContext' {
  export const useProductDispatch: () => ProductDispatchContext

  interface ProductDispatchContext {
    dispatch (payload: { type: string, args?: any }): void
  }
}
