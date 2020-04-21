declare module 'vtex.product-context/useProduct' {
  const useProduct: () => ProductContext
  export default useProduct

  interface ProductContext {
    selectedQuantity: number
    selectedItem: {
      sellers: Array<{
        unitMultiplier: number
        measurementUnit: string
        commertialOffer: {
          AvailableQuantity: number
        }
      }>
    }
  }
}

declare module 'vtex.product-context/ProductDispatchContext' {
  type DispatchFunction = (payload: { type: string; args?: any }) => void
  export const useProductDispatch: () => DispatchFunction
}
