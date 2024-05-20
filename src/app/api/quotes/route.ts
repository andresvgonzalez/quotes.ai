import { NextRequest, NextResponse } from 'next/server';
import Quote from '@/db/models/Quote';
import connectToDatabase from '@/db/mongodb';

export const GET = async (req: NextRequest) => {
  try {
    // connecting to database
    await connectToDatabase();
    const quotes = await Quote.find();
    return NextResponse.json(quotes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
};
