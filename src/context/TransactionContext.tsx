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
  isLoadingSms: boolean;
  syncSmsTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasSmsConsent, setSmsConsentState] = useState<boolean | null>(null);
  const [isLoadingSms, setIsLoadingSms] = useState(false);

  // Persistence/Override for Consent
  const setSmsConsent = (consent: boolean) => {
    setSmsConsentState(consent);
  };

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

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      addTransaction, 
      removeTransaction, 
      hasSmsConsent, 
      setSmsConsent,
      isLoadingSms,
      syncSmsTransactions 
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
