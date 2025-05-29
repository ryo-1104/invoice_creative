export interface InvoiceItem {
  itemName: string;
  unitPrice: number;
  quantity: number;
  amount: number; // This will be calculated as unitPrice * quantity
}

export interface Invoice {
  date: string; // Format: YYYY-MM-DD
  recipient: string;
  items: InvoiceItem[];
  subtotal: number; // This will be calculated as the sum of all item amounts
  tax: number; // This will be calculated as 10% of the subtotal
  total: number; // This will be calculated as subtotal + tax
}