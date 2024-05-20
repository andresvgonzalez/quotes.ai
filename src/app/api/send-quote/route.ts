import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/db/mongodb';
import Quote from '@/db/models/Quote';

export const POST = async (req: NextRequest) => {
  try {
    const { quoteId } = await req.json();
    // connect to database
    await connectToDatabase();
    // update document
    await Quote.updateOne({ id: quoteId }, {
      $set: { "status": "sent" }
    });

    return NextResponse.json({ message: 'Quote sent successfully' }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
};
