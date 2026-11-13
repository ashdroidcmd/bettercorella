# Contributing to Better Inabanga

Thank you for your interest in contributing to **Better Inabanga** (`betterinabanga`), an independent, open-source civic portal for the Municipality of Inabanga, Bohol, developed under the **BetterGov.ph** ecosystem.

## 🎯 Code of Conduct & Mission
Better Inabanga is non-partisan, neutral, and dedicated to transparency, public accessibility, and civic empowerment. All data presented must be verified against official primary sources (e.g., LGU ordinances, Citizen's Charter, PSA, DILG, BLGF, PhilGEPS).

## 🛠️ How to Contribute

### 1. Reporting Issues & Data Corrections
If you find a broken link, outdated hotline, incorrect official information, or missing service:
- Open an issue on [GitHub Issues](https://github.com/gerardosocias29/betterinabanga/issues/new).
- Provide the exact page URL and the official reference link or document supporting the correction.

### 2. Suggesting Features
- Discuss major architectural or design changes before opening a pull request.
- Ensure all designs adhere to accessibility guidelines (WCAG 2.1 AA) and mobile responsiveness.

### 3. Local Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/gerardosocias29/betterinabanga.git
   cd betterinabanga
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Run tests and linting before submitting:
   ```bash
   npx vitest run
   npm run build
   ```

## 📜 Verifying Citations and Sources
- Every dataset in `src/data/` should reference a valid, accessible source URL or local archive in `/forms/`.
- Ensure all municipality references reflect **Inabanga, Bohol** (not other LGUs).

Thank you for helping build a more transparent and connected Inabanga!
