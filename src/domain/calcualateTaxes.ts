import type { TaxBracket } from './types'

export function calculateTaxes(
    income: number, 
    brackets: TaxBracket[]
) {
    if (income <= 0) return 0

    let totalTax = 0

    for (const bracket of brackets) {
        if (income > bracket.min) {

            // Calculate the taxable income for the current bracket
            const taxableIncome = Math.max(
                0,
                Math.min(income, bracket.max ?? income) - bracket.min
            )
            totalTax += taxableIncome * bracket.rate
        }
    }

  return totalTax  
}

