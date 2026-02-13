# 💳 Can I Afford This? Calculator

A smart financial decision tool that evaluates whether you can afford a purchase based on your income, savings, and payment options.

## Features

- **Affordability Classification**: Safe to Buy, Risky, or Financial Stress
- **Financial Stress Meter**: Visual 0-100% stress level indicator
- **EMI Options**: Calculate affordability with installment plans (3, 6, 12, 24 months)
- **Smart Logic**: Evaluates payment-to-income ratio and emergency fund status

## How It Works

### Input
- Product price
- Monthly salary
- Current savings
- EMI option (or full payment)

### Output
- **Status**: Safe to Buy / Risky / Financial Stress
- **Stress Level**: Percentage with color-coded meter
- **Details**: Payment breakdown, income ratio, savings impact

### Logic
- **Safe**: Payment <15% of income, emergency fund >100%
- **Risky**: Payment 15-30% of income OR emergency fund 50-100%
- **Stress**: Payment >30% of income OR insufficient funds

Emergency fund = 3 months of salary

## Usage

Open `index.html` in any browser. No installation required.

## Technologies

HTML, CSS, JavaScript
