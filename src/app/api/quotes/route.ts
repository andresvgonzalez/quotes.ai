import { NextRequest, NextResponse } from 'next/server';
import { getQuotesFromFile } from '../../../utils/storage';

export const GET = async (req: NextRequest) => {
  const quotes = getQuotesFromFile();
  return NextResponse.json(quotes, { status: 200 });
};
