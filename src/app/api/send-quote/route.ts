import { NextRequest, NextResponse } from 'next/server';
import { updateQuoteStatusInFile } from '../../../utils/storage';

export const POST = async (req: NextRequest) => {
  const { quoteId } = await req.json();
  updateQuoteStatusInFile(quoteId, 'sent');
  return NextResponse.json({ message: 'Quote sent successfully' }, { status: 200 });
};
