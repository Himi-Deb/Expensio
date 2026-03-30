# Expensio - Finance Personalised

> A multi-currency expense tracking mobile app built with React Native & Expo.

Expensio is a personal finance application that helps you track spending, manage budgets, split expenses with groups, and gain AI-powered insights into your financial habits — all wrapped in a sleek, neon-accented dark UI.

---

---

## Features

### 💳 Track Expenses
- **Total Spent card** — month-to-date spend with a unique Vault ID
- **Budget cards** — create and track category budgets with progress bars
- **Recent Activity** — live feed of the latest transactions with cleared/pending status badges
- **Floating action button** → opens New Transaction in one tap

### 📊 Analytics & Distribution
- **Detailed Distribution** — animated SVG donut ring chart showing spend breakdown
- **Category Breakdown** — ranked list of spend categories with proportional progress bars, transaction counts, and percentages
- **Spending Insight** — contextual tips (e.g. "Your Dining spends are 20% higher than last month")

### 🍽 Category Transactions
- Drill into any category (e.g. Dining) to see all transactions
- **Spending Velocity** card — monthly frequency rating with comparison to your average
- Inline search to filter transactions within a category

### 🧾 Transaction Detail
- Full breakdown: merchant, amount, category, account used, and exact timestamp
- **Source SMS** — raw bank SMS that triggered the transaction (for SMS-parsed transactions)
- **Notes & Evidence** — add personal notes and attach receipts or images
- One-tap **Split with Group** to assign the expense to a group

### 👥 Groups & Splitting
- **Select Group to Split** — pick from existing groups with live balance status
  - 🔴 *You owe* · 🟢 *Owed to you* · ⚪ *Settled*
- **Create New Group** inline from the split picker

### 💰 Budget Management
- **Create Budget modal** — set a limit with an interactive slider (₹0 – ₹1,00,000)
- Category chip selector with horizontal scroll
- Named budgets (e.g. "Monthly Groceries")

### 🗂 Category Management
- **Select Category modal** — searchable list with average monthly spend per category
- **Create Custom Category** — type a name; your initial becomes the icon automatically

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React Native](https://reactnative.dev/) 0.83 + [Expo](https://expo.dev/) ~55 |
| Routing | [Expo Router](https://expo.github.io/router/) v4 (file-based) |
| UI | Vanilla React Native StyleSheet (no UI library) |
| Icons | [Lucide React Native](https://lucide.dev/) |
| Charts | [react-native-svg](https://github.com/software-mansion/react-native-svg) |
| Fonts | Manrope (display) + Inter (body) via `@expo-google-fonts` |
| Animations | react-native-reanimated + react-native-gesture-handler |
| Language | TypeScript |

---

## Design System

Expensio uses a custom **Dark Neon** design system built on tonal surface layering.

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#32FCB3` | Neon mint — CTAs, highlights, icons |
| `primaryContainer` | `#123C2E` | Tinted green card backgrounds |
| `background` | `#0B0D0C` | App background (deepest black) |
| `surfaceContainerLow` | `#151716` | Base card level |
| `surfaceContainerHigh` | `#1C1E1D` | Elevated icons & inputs |
| `surfaceContainerHighest` | `#262827` | Chips, selected states |
| `onSurface` | `#FFFFFF` | Primary text |
| `onSurfaceVariant` | `#8A918E` | Secondary / muted text |
| `tertiary` | `#FF5964` | Negative amounts & alerts |

**Typography:** `Manrope_700Bold` for display amounts · `Manrope_600SemiBold` for headings · `Inter_500Medium` for labels · `Inter_400Regular` for body

---

## Screen Map

```
(tabs)/
├── index.tsx            → Home Dashboard
├── activity.tsx         → Activity / Dining Out Detail
├── groups.tsx           → Groups overview
└── profile.tsx          → Me / Profile

app/
├── detailed-distribution.tsx   → Analytics donut chart & breakdown
├── dining-transactions.tsx     → Category transaction list
├── transaction-detail.tsx      → Single transaction detail
├── new-transaction.tsx         → Add new transaction (modal)
├── create-budget.tsx           → Create budget (modal)
├── select-category.tsx         → Category picker (modal)
├── select-group.tsx            → Group picker (modal)
└── settle-up.tsx               → Settle up with a contact (modal)
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone **or** Android/iOS simulator

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Himi-Deb/Expensio.git
cd Expensio

# Install dependencies
npm install

# Start the dev server
npx expo start
```

Then:
- **Physical device** → scan the QR code with [Expo Go](https://expo.dev/go)
- **Android emulator** → press `a` in the terminal
- **Web preview** → press `w` (limited fidelity)

---

## Project Structure

```
Expensio/
├── app/                  # Expo Router screens
│   ├── (tabs)/           # Bottom tab screens
│   └── *.tsx             # Modal & push screens
├── src/
│   ├── theme/
│   │   ├── tokens.ts     # Design tokens (colors, spacing, radii)
│   │   └── theme.ts      # React context provider
│   ├── components/       # Shared UI components (WIP)
│   └── features/         # Feature-scoped logic (WIP)
├── assets/               # Images & icons
├── app.json              # Expo config
└── package.json
```

---

## Roadmap

- [ ] SMS parsing integration for automatic transaction import
- [ ] UPI deep-link for group settlement payments
- [ ] Charts with real data from local storage / backend
- [ ] Push notifications for budget alerts
- [ ] Onboarding flow
- [ ] Cloud sync & multi-device support

---

## License

MIT © 2024 Himi Deb
