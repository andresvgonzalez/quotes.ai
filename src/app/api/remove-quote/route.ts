import { NextRequest, NextResponse } from 'next/server';
import { getQuotesFromFile, saveQuotesToFile } from '../../../utils/storage';

export const POST = async (req: NextRequest) => {
  const { quoteId } = await req.json();
  let quotes = getQuotesFromFile();
  quotes = quotes.filter((quote) => quote.id !== quoteId);
  saveQuotesToFile(quotes);
  return NextResponse.json({ message: 'Quote removed successfully' }, { status: 200 });
};
