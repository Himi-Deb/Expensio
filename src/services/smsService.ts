import { PermissionsAndroid, Platform } from 'react-native';

export interface ParsedTransaction {
  merchant: string;
  amount: number;
  date: string;
  source: string; // Last 4 digits or UPI ID
}

class SmsService {
  /**
   * Request system permission for reading SMS (Android only)
   */
  async requestPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      // Simulate success on iOS/Web for prototyping purposes
      return true;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "SMS Reading Permission",
          message: "Expensio needs access to your SMS to automatically track your bank transactions.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  /**
   * Heuristic Parser for Indian Bank SMS Patterns
   * Examples:
   * 1. Rs. 500.00 debited from A/c XX1234 to Zomato on 21-03-24
   * 2. Spent Rs. 1200 at Swiggy with Card ending 9876
   */
  parseBankSms(message: string): ParsedTransaction | null {
    const amountRegex = /(?:Rs\.?|INR|₹)\s?([\d,]+\.?\d*)/i;
    const accountRegex = /(?:A\/c|Acct|Card|ending)\s?([X\d]{2,10})/i;
    const merchantRegex = /(?:at|to|for|at)\s+([A-Za-z0-9\s&]+?)(?:\s+on|\s+with|\s+via|\.|$)/i;
    const dateRegex = /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/;

    const amountMatch = message.match(amountRegex);
    const accountMatch = message.match(accountRegex);
    const merchantMatch = message.match(merchantRegex);
    const dateMatch = message.match(dateRegex);

    if (amountMatch) {
      return {
        amount: parseFloat(amountMatch[1].replace(/,/g, '')),
        source: accountMatch ? accountMatch[1] : 'Unknown',
        merchant: merchantMatch ? merchantMatch[1].trim() : 'Unknown Merchant',
        date: dateMatch ? dateMatch[1] : new Date().toLocaleDateString(),
      };
    }

    return null;
  }
}

export const smsService = new SmsService();
