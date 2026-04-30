import type { TaxBracket, TaxBandResult, TaxCalculationResult } from './types'

export function calculateTaxes(
  income: number,
  brackets: TaxBracket[],
): TaxCalculationResult {
  if (income <= 0) {
    return {
      totalTax: 0,
      effectiveRate: 0,
      bands: [],
    }
  }

  let totalTax = 0
  const bands: TaxBandResult[] = []

  for (const bracket of brackets) {
    if (income > bracket.min) {
      const upperLimit = bracket.max ?? income

      const taxableIncome = Math.max(
        0,
        Math.min(income, upperLimit) - bracket.min,
      )

      const tax = taxableIncome * bracket.rate
      totalTax += tax

      bands.push({
        min: bracket.min,
        max: bracket.max,
        rate: bracket.rate,
        taxableIncome,
        tax,
      })
    }
  }

  return {
    totalTax,
    effectiveRate: totalTax / income,
    bands,
  }
}