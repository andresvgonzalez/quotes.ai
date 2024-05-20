import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/db/mongodb';
import Quote from '@/db/models/Quote';

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    // get quote id
    const { quoteId } = await req.json();
    // remove from db
    await Quote.deleteOne({ id: quoteId });

    return NextResponse.json({ message: 'Quote removed successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
};

export const revalidate = 0;
