import { NextRequest, NextResponse } from 'next/server';
import { Quote as QuoteI } from '../../../types';
import connectToDatabase from '@/db/mongodb';
import Quote from '@/db/models/Quote';

export const POST = async (req: NextRequest) => {
  try {
    // get updated quote info
    const updatedQuote: QuoteI = await req.json();
    // connect to database
    await connectToDatabase();
    // update document
    await Quote.updateOne({ id: updatedQuote.id }, {
      $set: updatedQuote
    });

    return NextResponse.json({ message: 'Quote updated successfully' }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: 'Quote not found' }, { status: 404 });
  }
};
