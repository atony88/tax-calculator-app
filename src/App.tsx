import { useForm } from 'react-hook-form'
import { SUPPORTED_YEARS } from './api/taxApi'
import { useTaxCalculation } from './hooks/useTaxCalculation'

type FormValues = {
  income: number
  year: string
}

function App() {
  const { result, loading, error, calculate } = useTaxCalculation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      income: 0,
      year: '2022',
    },
  })

  const onSubmit = (values: FormValues) => {
    calculate(Number(values.income), values.year)
  }

  return (
  <main className='min-h-screen px-6 pt-24'>
    <section className='mx-auto w-full max-w-2xl rounded-2xl bg-white p-14 shadow-xl'>
      <h1 className='text-center text-4xl font-bold !text-black'>
        Tax Calculator
      </h1>

      <p className='mt-4 text-center text-sm text-slate-600'>
        Calculate income tax by year.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
        <div>
          <label className='block text-center text-sm font-medium text-slate-700'>
            Annual income
          </label>
          <input
            type='number'
            className='mt-2 w-full rounded-lg border border-slate-300 p-4 text-lg text-slate-900'
            {...register('income', {
              required: 'Income is required',
              min: {
                value: 0,
                message: 'Income cannot be negative',
              },
              valueAsNumber: true,
            })}
          />
          {errors.income && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.income.message}
            </p>
          )}
        </div>

        <div>
          <label className='block text-center text-sm font-medium text-slate-700'>
            Tax year
          </label>
          <select
            className='mt-2 w-full rounded-lg border border-slate-300 p-4 text-lg text-slate-900'
            {...register('year', {
              required: 'Tax year is required',
            })}
          >
            {SUPPORTED_YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-lg bg-black p-4 text-lg font-semibold text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {error && <p className='text-center text-md text-red-600'>{error}</p>}

      {result !== null && !error && (
        <div className='mt-8 rounded-xl bg-slate-100 p-2 text-center'>
          <p className='text-sm text-slate-600'>Total tax owed</p>
          <p className='mt-2 text-3xl font-bold text-slate-900'>
            ${result.toFixed(2)}
          </p>
        </div>
      )}
    </section>

    <footer className='mt-10 text-center text-sm text-slate-200'>
      Built with care by Arezoo Tony
    </footer>
  </main>
)
}

export default App