interface SelectedItem {
  unitMultiplier: number
  measurementUnit: string
  sellers: Array<{
    commertialOffer: {
      AvailableQuantity: number
    }
  }>
}