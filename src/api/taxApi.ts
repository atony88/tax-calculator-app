import type { TaxBracketsResponse, TaxBracket } from "../domain/types"

export const SUPPORTED_YEARS = ['2019', '2020', '2021', '2022'] as const

export async function fetchTaxBrackets(
    year: string,
    retries: number = 3,
): Promise<TaxBracket[]> {

    if (!SUPPORTED_YEARS.includes(year as typeof SUPPORTED_YEARS[number])) {
        throw new Error('Unsupported tax year, please select a valid year between 2019 and 2022.')
    }

    const response = await fetch(`/tax-calculator/tax-year/${year}`)
    if (!response.ok) {
        if (retries > 0) {
            console.warn(`Failed to fetch tax brackets. Retrying... (${retries} attempts left)`)
            return fetchTaxBrackets(year, retries - 1)
        }
        throw new Error('Failed to fetch tax brackets. Please try again later.')
    }

    const data = (await response.json()) as TaxBracketsResponse
    if (!Array.isArray(data.tax_brackets)) {
        throw new Error('Invalid data format received from server. Tax brackets must be an array.')
    }

    return data.tax_brackets
}