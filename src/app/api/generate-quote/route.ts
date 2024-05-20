import { generateQuote } from '../../../utils/quote';
import connectToDatabase from '@/db/mongodb';
import Quote from '@/db/models/Quote';

export const POST = async (req: Request) => {
  try {
    // connecting to database
    await connectToDatabase();
    const { rfqData, inventoryStatus } = await req.json();
    const quote = generateQuote(rfqData, inventoryStatus);

    // adding to the database
    const createdQuote = await Quote.create(quote)

    return Response.json(createdQuote, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
};

export const revalidate = 10;
