import { useState } from 'react'
import { fetchTaxBrackets } from '../api/taxApi'
import { calculateTaxes } from '../domain/calcualateTaxes'
import type{ TaxCalculationResult } from '../domain/types'

export function useTaxCalculation() {
    const [result, setResult] = useState<TaxCalculationResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const calculate = async (income: number, year: string) => {
        setLoading(true)
        setError(null)

        try {
            const brackets = await fetchTaxBrackets(year)
            const totalTax = calculateTaxes(income, brackets)
            
            setResult(totalTax)
        } catch (err) {
            setError((err as Error).message)
            setResult(null)
        } finally {
            setLoading(false)
        }
    }

    return { result, loading, error, calculate }
}