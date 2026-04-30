# Tax Calculator – Take-Home Assignment

## Overview

This app calculates income tax based on a salary and tax year using marginal tax rates.

It fetches tax brackets from the provided API and shows:

* Total tax owed
* Effective tax rate
* Tax breakdown per bracket

---

## Tech Stack

* React + TypeScript (Vite)
* React Hook Form
* Tailwind CSS
* Vitest

---

## Running the App

### Start API (Docker)

```bash
docker pull ptsdocker16/interview-test-server
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
```

### Start frontend

```bash
npm install
npm run dev
```

## Live Demo

You can view the UI here:
https://tax-calculator-app-beige.vercel.app/

⚠️ Note:
The API runs locally via Docker (as provided in the assignment).
To fully test the application, please run:

```bash
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
```

---

## Features

* Input income and tax year
* Fetch tax brackets from API
* Handles API failures with retry
* Shows:

  * Total tax
  * Effective rate
  * Tax per band
* Basic form validation
* Error handling

---

## Project Structure

```txt
src/
  api/      → API calls
  domain/   → tax calculation logic
  hooks/    → connects API + logic
```

---

## Approach

* Kept calculation logic as a pure function for easier testing
* Separated API logic from UI
* Used a custom hook to keep the component simple
* Added basic validation and error handling
* Handled API instability with retries

---

## Testing

* Unit tests added for tax calculation
* Covers the required scenarios:

  * $0
  * $50,000
  * $100,000
  * $1,234,567

---

## Notes

* Rounded values to avoid floating point issues
* Only supports years 2019–2022
* API can fail randomly, so retries are implemented

---

## Author

Arezoo Tony
