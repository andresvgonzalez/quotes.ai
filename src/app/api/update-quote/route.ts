import { NextRequest, NextResponse } from 'next/server';
import { getQuotesFromFile, saveQuotesToFile } from '../../../utils/storage';
import { Quote } from '../../../types';

export const POST = async (req: NextRequest) => {
  const updatedQuote: Quote = await req.json();
  const quotes = getQuotesFromFile();

  const quoteIndex = quotes.findIndex((quote) => quote.id === updatedQuote.id);
  if (quoteIndex !== -1) {
    quotes[quoteIndex] = updatedQuote;
    saveQuotesToFile(quotes);
    return NextResponse.json({ message: 'Quote updated successfully' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Quote not found' }, { status: 404 });
  }
};
