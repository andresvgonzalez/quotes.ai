import { NextRequest, NextResponse } from 'next/server';
import { generateQuote } from '../../../utils/quote';
import connectToDatabase from '@/db/mongodb';
import Quote from '@/db/models/Quote';

export const POST = async (req: NextRequest) => {
  try {
    // connecting to database
    await connectToDatabase();
    const { rfqData, inventoryStatus } = await req.json();
    const quote = generateQuote(rfqData, inventoryStatus);

    // adding to the database
    const createdQuote = await Quote.create(quote)

    return NextResponse.json(createdQuote, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
};
