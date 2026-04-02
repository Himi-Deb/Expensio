import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'expensio_exchange_rates';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const BASE_URL = 'https://open.er-api.com/v6/latest';

export interface RatesCache {
  base: string;
  rates: Record<string, number>;
  fetchedAt: number;
}

async function fetchRates(base: string): Promise<Record<string, number>> {
  const res = await fetch(`${BASE_URL}/${base}`);
  if (!res.ok) throw new Error(`Exchange rate fetch failed: ${res.status}`);
  const json = await res.json();
  return json.rates as Record<string, number>;
}

async function getCachedRates(base: string): Promise<RatesCache | null> {
  try {
    const raw = await AsyncStorage.getItem(`${CACHE_KEY}_${base}`);
    if (!raw) return null;
    const parsed: RatesCache = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function saveCache(base: string, rates: Record<string, number>): Promise<void> {
  const cache: RatesCache = { base, rates, fetchedAt: Date.now() };
  await AsyncStorage.setItem(`${CACHE_KEY}_${base}`, JSON.stringify(cache));
}

/**
 * Get all exchange rates relative to a base currency.
 * Uses cache if fresh; fetches from API otherwise.
 */
export async function getRates(base: string = 'INR'): Promise<Record<string, number>> {
  const cached = await getCachedRates(base);
  if (cached) return cached.rates;

  try {
    const rates = await fetchRates(base);
    await saveCache(base, rates);
    return rates;
  } catch (e) {
    // Return stale cache if network fails
    const raw = await AsyncStorage.getItem(`${CACHE_KEY}_${base}`);
    if (raw) return (JSON.parse(raw) as RatesCache).rates;
    throw e;
  }
}

/**
 * Convert an amount from one currency to another.
 * @param amount Source amount
 * @param from Source currency code (e.g. "USD")
 * @param to Target currency code (e.g. "INR")
 * @param rates Pre-fetched rates map (relative to a base)
 * @param base The base currency the rates map is relative to
 */
export function convertAmount(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>,
  base: string = 'INR'
): number {
  if (from === to) return amount;

  let amountInBase: number;
  if (from === base) {
    amountInBase = amount;
  } else {
    const fromRate = rates[from];
    if (!fromRate) throw new Error(`No rate for ${from}`);
    // rates are expressed as: 1 base = X foreign
    // so 1 foreign = 1/X base... but open.er-api gives rates FROM base TO foreign
    // We need: amount in from -> convert to base first
    // rates[from] = how many 'from' per 1 base
    amountInBase = amount / fromRate;
  }

  if (to === base) return amountInBase;

  const toRate = rates[to];
  if (!toRate) throw new Error(`No rate for ${to}`);
  return amountInBase * toRate;
}
