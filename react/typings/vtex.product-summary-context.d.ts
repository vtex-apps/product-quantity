declare module 'vtex.product-summary-context/ProductSummaryContext' {
  export const useProductSummary: () => ProductSummaryContext
  interface ProductSummaryContext {
    selectedQuantity: number
    selectedItem?: SelectedItem
  }

  type DispatchFunction = (payload: { type: string; args?: any }) => void
  export const useProductSummaryDispatch: () => DispatchFunction
}
