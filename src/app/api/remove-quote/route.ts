import connectToDatabase from '@/db/mongodb';
import Quote from '@/db/models/Quote';

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    // get quote id
    const { quoteId } = await req.json();
    // remove from db
    await Quote.deleteOne({ id: quoteId });

    return Response.json({ message: 'Quote removed successfully' }, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
};

export const revalidate = 0;
