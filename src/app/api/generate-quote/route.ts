import { NextRequest, NextResponse } from 'next/server';
import { generateQuote } from '../../../utils/quote';
import { addQuoteToFile } from '../../../utils/storage';

export const POST = async (req: NextRequest) => {
  const { rfqData, inventoryStatus } = await req.json();
  const quote = generateQuote(rfqData, inventoryStatus);
  addQuoteToFile(quote);
  return NextResponse.json(quote, { status: 200 });
};
