import Quote from '@/db/models/Quote';
import connectToDatabase from '@/db/mongodb';

export const GET = async () => {
  try {
    // connecting to database
    await connectToDatabase();
    const quotes = await Quote.find();
    return Response.json(quotes, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
};

export const revalidate = 0;
