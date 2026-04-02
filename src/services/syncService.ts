// src/services/syncService.ts
import { MaskedRecord } from './storageService';

/**
 * PRIVACY-FIRST ANALYTICS SYNC
 * Implementation of the "Gold Standard" security requirement:
 * This service ONLY transmits de-identified, high-level category aggregates.
 */

export interface AggregateReport {
  month: string;
  categoryTotals: { [category: string]: number };
  totalSpend: number;
}

class SyncService {
  /**
   * Syncs de-identified aggregate spending data to the backend.
   * Merchant names and Account IDs are STICKLY pruned before transmission.
   */
  async syncAggregationData(transactions: MaskedRecord[]): Promise<void> {
    const report = this.generateAggregateReport(transactions);
    
    console.log('--- GOLD STANDARD PRIVACY SYNC ---');
    console.log('Payload transmitted to backend:', JSON.stringify(report, null, 2));
    
    // Simulate API call to suggestions engine
    // In production, this would be: await fetch('https://api.expensio.com/sync', { ... })
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  /**
   * Generates a monthly aggregate report from transaction history.
   * Note: No merchant names or card IDs are included in the return object.
   */
  private generateAggregateReport(transactions: MaskedRecord[]): AggregateReport {
    const totals: { [category: string]: number } = {};
    let grandTotal = 0;

    transactions.forEach(tx => {
      // Sum by category
      totals[tx.category] = (totals[tx.category] || 0) + Math.abs(tx.amount);
      grandTotal += Math.abs(tx.amount);
    });

    return {
      month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
      categoryTotals: totals,
      totalSpend: grandTotal
    };
  }
}

export const syncService = new SyncService();
