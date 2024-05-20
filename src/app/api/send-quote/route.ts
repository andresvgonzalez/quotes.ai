import connectToDatabase from '@/db/mongodb';
import Quote from '@/db/models/Quote';

export const POST = async (req: Request) => {
  try {
    const { quoteId } = await req.json();
    // connect to database
    await connectToDatabase();
    // update document
    await Quote.updateOne({ id: quoteId }, {
      $set: { "status": "sent" }
    });

    return Response.json({ message: 'Quote sent successfully' }, { status: 200 });
    
  } catch (error) {
    return Response.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
};

export const revalidate = 0;
