import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { TransactionIcon } from '../utils/categorization';
import { storageService, MaskedRecord } from '../services/storageService';
import { syncService } from '../services/syncService';

export interface Transaction {
  id: string;
  name: string;
  originalName?: string; // Original name from SMS/Source
  amount: number;
  currencyCode?: string;  // e.g. 'INR', 'USD' — defaults to user's base currency
  amountInBase?: number;  // amount converted to base currency (INR) for calculations
  category: string;
  iconName: TransactionIcon;
  date: string;
  status: 'CLEARED' | 'PENDING' | 'FLAGGED';
  source?: string;
  remarks?: string;
  attachment?: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  name: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  removeTransaction: (id: string) => void;
  categoryBudgets: Budget[];
  addCategoryBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
  globalBudget: number | null;
  setGlobalBudget: (limit: number | null) => void;
  getCategoryDistribution: () => { label: string; value: number; color: string }[];
  getWeeklyTrends: () => { day: string; amount: number }[];
  hasSmsConsent: boolean | null;
  setSmsConsent: (consent: boolean) => void;
  isLoadingSms: boolean;
  syncSmsTransactions: () => Promise<void>;
  seedMockOverviewData: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryBudgets, setCategoryBudgets] = useState<Budget[]>([]);
  const [globalBudget, setGlobalBudgetState] = useState<number | null>(null);
  const [hasSmsConsent, setSmsConsentState] = useState<boolean | null>(null);
  const [isLoadingSms, setIsLoadingSms] = useState(false);

  // 1. Initial Load from Vault
  useEffect(() => {
    const init = async () => {
      const data = await storageService.loadTransactions();
      setTransactions(data as Transaction[]);
    };
    init();
  }, []);

  // 2. Automatic Privacy Sync on change + Budget Spend Recalculation
  useEffect(() => {
    if (transactions.length > 0) {
      syncService.syncAggregationData(transactions as MaskedRecord[]);

      // Update Spending across Category Budgets
      setCategoryBudgets(prev => prev.map(budget => {
        const spent = transactions
          .filter(tx => tx.category.toLowerCase() === budget.category.toLowerCase())
          .reduce((sum, tx) => sum + Math.abs(tx.amountInBase || tx.amount), 0);
        return { ...budget, spent };
      }));
    }
    // Update Vault with Masked/Encrypted data
    storageService.saveTransactions(transactions as MaskedRecord[]);
  }, [transactions]);

  // 3. Persistence for Budgets
  useEffect(() => {
    const saveBudgets = async () => {
      // In a real app, we'd use storageService.saveBudgets (masking optionally)
      // For now, let's keep it in sync
    };
    saveBudgets();
  }, [categoryBudgets, globalBudget]);

  const setGlobalBudget = (limit: number | null) => {
    setGlobalBudgetState(limit);
  };

  const addCategoryBudget = (budget: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget: Budget = {
      ...budget,
      id: Math.random().toString(36).substr(2, 9),
      spent: transactions
        .filter(tx => tx.category.toLowerCase() === budget.category.toLowerCase())
        .reduce((sum, tx) => sum + Math.abs(tx.amountInBase || tx.amount), 0),
    };

    setCategoryBudgets(prev => {
      // Overwrite existing budget for the same category
      const filtered = prev.filter(b => b.category.toLowerCase() !== budget.category.toLowerCase());
      return [...filtered, newBudget];
    });
  };

  // Persistence/Override for Consent
  const setSmsConsent = (consent: boolean) => {
    setSmsConsentState(consent);
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const rawTx = {
      ...tx,
      id: Math.random().toString(36).substr(2, 9),
      originalName: tx.name, // Preserve the original extracted name
    };
    
    // Applying the Gold Standard Masking Engine
    const maskedTx = storageService.maskTransaction(rawTx);

    setTransactions((prev) => [maskedTx as Transaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) => prev.filter(t => t.id !== id));
  };

  const seedMockOverviewData = () => {
    // Only seed if we don't have transactions yet
    if (transactions.length > 0) return;

    const mockSeeds: Omit<Transaction, 'id'>[] = [
      { name: 'Apple Store', amount: -1299.00, category: 'Shopping', iconName: 'ShoppingBag', date: 'Today', status: 'CLEARED' },
      { name: 'Starbucks Coffee', amount: -12.50, category: 'Dining Out', iconName: 'Coffee', date: 'Today', status: 'CLEARED' },
      { name: 'Amazon.in', amount: -4500.00, category: 'Shopping', iconName: 'ShoppingBag', date: 'Yesterday', status: 'CLEARED' },
      { name: 'Uber Trim', amount: -320.00, category: 'Transport', iconName: 'Car', date: 'Yesterday', status: 'CLEARED' },
      { name: 'Netflix Subscription', amount: -649.00, category: 'Utilities', iconName: 'Monitor', date: '25 Mar', status: 'CLEARED' },
      { name: 'Airtel Postpaid', amount: -899.00, category: 'Utilities', iconName: 'Zap', date: '24 Mar', status: 'CLEARED' },
      { name: 'Indigo Airlines', amount: -5600.00, category: 'Travel', iconName: 'Plane', date: '20 Mar', status: 'CLEARED' },
      { name: 'The Taj Hotel', amount: -8500.00, category: 'Travel', iconName: 'Globe', date: '19 Mar', status: 'CLEARED' },
    ];

    mockSeeds.forEach(tx => addTransaction(tx));
    
    // Also seed some budgets
    addCategoryBudget({ category: 'Dining Out', limit: 5000, name: 'Dining Pool' });
    addCategoryBudget({ category: 'Shopping', limit: 15000, name: 'Shopping Pool' });
    addCategoryBudget({ category: 'Travel', limit: 20000, name: 'Vacation Fund' });
    setGlobalBudget(50000);
  };

  const syncSmsTransactions = async () => {
    setIsLoadingSms(true);
    // Simulate real parsing delay for that 'premium' feel
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockSmsData: Omit<Transaction, 'id'>[] = [
      { name: 'HDFC Bank', amount: -1540.00, category: 'Shopping', iconName: 'ShoppingBag', date: 'Yesterday', status: 'CLEARED' },
      { name: 'Zomato UPI', amount: -642.50, category: 'Dining Out', iconName: 'Utensils', date: '21 Mar', status: 'CLEARED' },
      { name: 'Uber India', amount: -420.00, category: 'Transport', iconName: 'Car', date: '20 Mar', status: 'CLEARED' },
    ];

    mockSmsData.forEach(tx => addTransaction(tx));
    setIsLoadingSms(false);
    setSmsConsentState(true);
  };

  const getCategoryDistribution = () => {
    const totals: { [key: string]: number } = {};
    let grandTotal = 0;

    transactions.forEach(tx => {
      const val = Math.abs(tx.amountInBase || tx.amount);
      totals[tx.category] = (totals[tx.category] || 0) + val;
      grandTotal += val;
    });

    const categoryColors: { [key: string]: string } = {
      'Shopping': '#73FFE3', // Neon Mint
      'Dining Out': '#FF716C', // Coral
      'Transport': '#86FFD9', // Soft Mint
      'Utilities': '#A29BFE', // Purple
      'Housing': '#FAB1A0', // Peach
      'Travel': '#74B9FF', // Sky Blue
    };

    return Object.keys(totals).map(cat => ({
      label: cat,
      value: (totals[cat] / (grandTotal || 1)) * 100,
      color: categoryColors[cat] || '#808080',
    })).sort((a, b) => b.value - a.value);
  };

  const getWeeklyTrends = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d;
    }).reverse();

    return last7Days.map(date => {
        const dayName = days[date.getDay()];
        const dayStr = date.toLocaleDateString();
        const amount = transactions
            .filter(tx => {
                // In a real app, parse the tx.date string properly
                // For this prototype, we match by simple string or 'Today'/'Yesterday'
                const txDate = tx.date === 'Today' ? new Date().toLocaleDateString() : 
                               tx.date === 'Yesterday' ? new Date(Date.now() - 86400000).toLocaleDateString() : 
                               tx.date;
                return txDate === dayStr;
            })
            .reduce((sum, tx) => sum + Math.abs(tx.amountInBase || tx.amount), 0);

        return { day: dayName, amount };
    });
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      addTransaction, 
      updateTransaction,
      removeTransaction,
      categoryBudgets,
      addCategoryBudget,
      globalBudget,
      setGlobalBudget,
      getCategoryDistribution,
      getWeeklyTrends,
      hasSmsConsent, 
      setSmsConsent,
      isLoadingSms,
      syncSmsTransactions,
      seedMockOverviewData
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
