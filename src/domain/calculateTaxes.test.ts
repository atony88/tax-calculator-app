import { describe, expect, it } from 'vitest'
import { calculateTaxes } from './calcualateTaxes'
import type { TaxBracket } from './types'

const brackets2022: TaxBracket[] = [
  { min: 0, max: 50197, rate: 0.15 },
  { min: 50197, max: 100392, rate: 0.205 },
  { min: 100392, max: 155625, rate: 0.26 },
  { min: 155625, max: 221708, rate: 0.29 },
  { min: 221708, rate: 0.33 },
]

describe('calculateTaxes', () => {
  it('returns zero tax for zero income', () => {
    expect(calculateTaxes(0, brackets2022).totalTax).toBe(0)
  })

  it('calculates tax for $50,000 income', () => {
    expect(calculateTaxes(50000, brackets2022).totalTax).toBeCloseTo(7500, 2)
  })

  it('calculates tax for $100,000 income', () => {
    expect(calculateTaxes(100000, brackets2022).totalTax).toBeCloseTo(17739.17, 2)
  })

  it('calculates tax for $1,234,567 income', () => {
    expect(calculateTaxes(1234567, brackets2022).totalTax).toBeCloseTo(385587.65, 2)
  })
})