import fs from 'fs';
import path from 'path';
import { Quote } from '../types';

const filePath = path.join(process.cwd(), 'quotes-db.json');

export const getQuotesFromFile = (): Quote[] => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContents) as Quote[];
};

export const saveQuotesToFile = (quotes: Quote[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2), 'utf-8');
};

export const addQuoteToFile = (quote: Quote): void => {
  const quotes = getQuotesFromFile();
  quotes.push(quote);
  saveQuotesToFile(quotes);
};

export const updateQuoteStatusInFile = (quoteId: string, status: 'draft' | 'sent'): void => {
  const quotes = getQuotesFromFile();
  const quoteIndex = quotes.findIndex(quote => quote.id === quoteId);
  if (quoteIndex !== -1) {
    quotes[quoteIndex].status = status;
    saveQuotesToFile(quotes);
  }
};
