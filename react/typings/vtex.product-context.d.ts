declare module 'vtex.product-context/useProduct' {
  const useProduct: () => ProductContext
  export default useProduct

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
