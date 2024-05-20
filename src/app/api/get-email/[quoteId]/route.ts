import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/db/mongodb';
import Email from '@/db/models/Email';

export const GET = async (req: NextRequest, context: { params: { quoteId: string } }) => {

  try {
    // getting quoteID
    const { quoteId } = context.params;

    // connect to database
    await connectToDatabase();
    const email = await Email.find({ quoteId });

    if (email.length) {
      return NextResponse.json({ emailContent: email[0].emailContent }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
};
