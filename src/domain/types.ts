export type TaxBracket = {
    min: number
    max?: number
    rate: number
}

export type TaxBandResult = {
  min: number
  max?: number
  rate: number
  taxableIncome: number
  tax: number
}

export type TaxCalculationResult = {
  totalTax: number
  effectiveRate: number
  bands: TaxBandResult[]
}

export type TaxBracketsResponse = {
  tax_brackets: TaxBracket[]
}