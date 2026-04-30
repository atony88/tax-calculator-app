export type TaxBracket = {
    min: number
    max: number
    rate: number
}

export type TaxBracketsResponse = {
  tax_brackets: TaxBracket[]
}