import { Quote as QuoteI } from '../../../types';
import connectToDatabase from '@/db/mongodb';
import Quote from '@/db/models/Quote';

export const POST = async (req: Request) => {
  try {
    // get updated quote info
    const updatedQuote: QuoteI = await req.json();
    // connect to database
    await connectToDatabase();
    // update document
    await Quote.updateOne({ id: updatedQuote.id }, {
      $set: updatedQuote
    });

    return Response.json({ message: 'Quote updated successfully' }, { status: 200 });
    
  } catch (error) {
    return Response.json({ message: 'Quote not found' }, { status: 404 });
  }
};

export const revalidate = 0;
