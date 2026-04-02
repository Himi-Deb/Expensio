import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getRates, convertAmount } from '../services/exchangeRate';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  supported: boolean; // true = auto rate, false = manual rate
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹',   name: 'Indian Rupee',       supported: true },
  { code: 'USD', symbol: '$',   name: 'US Dollar',           supported: true },
  { code: 'EUR', symbol: '€',   name: 'Euro',                supported: true },
  { code: 'GBP', symbol: '£',   name: 'British Pound',       supported: true },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham',          supported: true },
  { code: 'THB', symbol: '฿',   name: 'Thai Baht',           supported: true },
  { code: 'VND', symbol: '₫',   name: 'Vietnamese Dong',     supported: true },
  { code: 'JPY', symbol: '¥',   name: 'Japanese Yen',        supported: true },
  { code: 'CNY', symbol: '¥',   name: 'Chinese Yuan',        supported: true },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar',     supported: true },
  { code: 'AUD', symbol: 'A$',  name: 'Australian Dollar',   supported: true },
  { code: 'SGD', symbol: 'S$',  name: 'Singapore Dollar',    supported: true },
  { code: 'KRW', symbol: '₩',   name: 'South Korean Won',    supported: true },
  { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar',       supported: true },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso',        supported: true },
  { code: 'CHF', symbol: 'Fr',  name: 'Swiss Franc',         supported: true },
  { code: 'BRL', symbol: 'R$',  name: 'Brazilian Real',      supported: true },
  { code: 'IDR', symbol: 'Rp',  name: 'Indonesian Rupiah',   supported: true },
  { code: 'MYR', symbol: 'RM',  name: 'Malaysian Ringgit',   supported: true },
];

interface CustomRate {
  code: string;
  symbol: string;
  name: string;
  rateToINR: number; // 1 unit of this currency = X INR
}

interface CurrencyContextType {
  baseCurrency: Currency;
  setBaseCurrency: (c: Currency) => void;
  rates: Record<string, number>; // rates relative to INR base
  isLoadingRates: boolean;
  ratesError: string | null;
  customRates: CustomRate[];
  addCustomRate: (rate: CustomRate) => void;
  convert: (amount: number, from: string, to: string) => number;
  getCurrencyByCode: (code: string) => Currency | undefined;
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [baseCurrency, setBaseCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]); // INR
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [ratesError, setRatesError] = useState<string | null>(null);
  const [customRates, setCustomRates] = useState<CustomRate[]>([]);

  const refreshRates = useCallback(async () => {
    setIsLoadingRates(true);
    setRatesError(null);
    try {
      const fetched = await getRates('INR');
      setRates(fetched);
    } catch (e: any) {
      setRatesError(e?.message || 'Failed to fetch exchange rates');
    } finally {
      setIsLoadingRates(false);
    }
  }, []);

  useEffect(() => {
    refreshRates();
  }, []);

  const convert = useCallback((amount: number, from: string, to: string): number => {
    if (from === to) return amount;

    // Check custom rates first (both directions)
    const customFrom = customRates.find(r => r.code === from);
    const customTo = customRates.find(r => r.code === to);

    // Convert to INR first, then to target
    let amountInINR: number;
    if (from === 'INR') {
      amountInINR = amount;
    } else if (customFrom) {
      amountInINR = amount * customFrom.rateToINR;
    } else {
      try {
        amountInINR = convertAmount(amount, from, 'INR', rates, 'INR');
      } catch {
        return amount; // fallback: no conversion
      }
    }

    if (to === 'INR') return amountInINR;

    if (customTo) {
      return amountInINR / customTo.rateToINR;
    }

    try {
      return convertAmount(amountInINR, 'INR', to, rates, 'INR');
    } catch {
      return amountInINR;
    }
  }, [rates, customRates]);

  const addCustomRate = useCallback((rate: CustomRate) => {
    setCustomRates(prev => [...prev.filter(r => r.code !== rate.code), rate]);
  }, []);

  const getCurrencyByCode = useCallback((code: string): Currency | undefined => {
    const supported = SUPPORTED_CURRENCIES.find(c => c.code === code);
    if (supported) return supported;
    const custom = customRates.find(r => r.code === code);
    if (custom) return { code: custom.code, symbol: custom.symbol, name: custom.name, supported: false };
    return undefined;
  }, [customRates]);

  return (
    <CurrencyContext.Provider value={{
      baseCurrency, setBaseCurrency,
      rates, isLoadingRates, ratesError,
      customRates, addCustomRate,
      convert, getCurrencyByCode, refreshRates,
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider');
  return ctx;
}
