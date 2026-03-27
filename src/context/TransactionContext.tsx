import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TransactionIcon } from '../utils/categorization';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  iconName: TransactionIcon;
  date: string;
  status: 'CLEARED' | 'PENDING';
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
  hasSmsConsent: boolean | null;
  setSmsConsent: (consent: boolean) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasSmsConsent, setSmsConsent] = useState<boolean | null>(null);

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx = {
      ...tx,
      id: Math.random().toString(36).substr(2, 9),
    };
    // Prepend to top of list
    setTransactions((prev) => [newTx, ...prev]);
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, removeTransaction, hasSmsConsent, setSmsConsent }}>
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
