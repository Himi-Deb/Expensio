// src/utils/categorization.ts
// Intelligent Splitwise-style heuristic categorizer for transaction merchants

export type TransactionIcon = 'Coffee' | 'Car' | 'ShoppingBag' | 'Utensils' | 'Monitor' | 'Home' | 'Activity' | 'CircleDollarSign';

export interface CategoryResult {
  category: string;
  iconName: TransactionIcon;
}

const heuristics: Record<string, CategoryResult> = {
  // Dining & Coffee
  starbucks: { category: 'Dining Out', iconName: 'Coffee' },
  dunkin: { category: 'Dining Out', iconName: 'Coffee' },
  mcdonald: { category: 'Dining Out', iconName: 'Utensils' },
  burger: { category: 'Dining Out', iconName: 'Utensils' },
  pizza: { category: 'Dining Out', iconName: 'Utensils' },
  subway: { category: 'Dining Out', iconName: 'Utensils' },
  cafe: { category: 'Dining Out', iconName: 'Coffee' },
  restaurant: { category: 'Dining Out', iconName: 'Utensils' },

  // Transport
  uber: { category: 'Transport', iconName: 'Car' },
  lyft: { category: 'Transport', iconName: 'Car' },
  taxi: { category: 'Transport', iconName: 'Car' },
  transit: { category: 'Transport', iconName: 'Car' },
  shell: { category: 'Transport', iconName: 'Car' },
  gas: { category: 'Transport', iconName: 'Car' },
  airlines: { category: 'Transport', iconName: 'Activity' }, // Plane-like

  // Electronics & Tech
  apple: { category: 'Electronics', iconName: 'Monitor' },
  'best buy': { category: 'Electronics', iconName: 'Monitor' },
  samsung: { category: 'Electronics', iconName: 'Monitor' },
  netflix: { category: 'Entertainment', iconName: 'Monitor' },
  spotify: { category: 'Entertainment', iconName: 'Activity' },

  // Groceries & Retail
  amazon: { category: 'Shopping', iconName: 'ShoppingBag' },
  walmart: { category: 'Groceries', iconName: 'Home' },
  target: { category: 'Groceries', iconName: 'Home' },
  whole: { category: 'Groceries', iconName: 'Home' },
  kroger: { category: 'Groceries', iconName: 'Home' },
  trader: { category: 'Groceries', iconName: 'Home' },
  store: { category: 'Shopping', iconName: 'ShoppingBag' },
  mall: { category: 'Shopping', iconName: 'ShoppingBag' },
};

export function autoCategorizeTransaction(merchantName: string): CategoryResult {
  const cleanName = merchantName.toLowerCase().trim();
  
  if (!cleanName) {
    return { category: 'General', iconName: 'CircleDollarSign' };
  }

  // Iterate over heuristics to find a keyword match
  for (const [keyword, result] of Object.entries(heuristics)) {
    if (cleanName.includes(keyword)) {
      return result;
    }
  }

  // Default fallback if no intelligent match is found
  return { category: 'General', iconName: 'CircleDollarSign' };
}
