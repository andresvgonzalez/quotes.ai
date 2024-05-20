import connectToDatabase from '@/db/mongodb';
import Email from '@/db/models/Email';

export const GET = async (req: Request, context: { params: { quoteId: string } }) => {

  try {
    // getting quoteID
    const { quoteId } = context.params;

    // connect to database
    await connectToDatabase();
    const email = await Email.find({ quoteId });

    if (email.length) {
      return Response.json({ emailContent: email[0].emailContent }, { status: 200 });
    } else {
      return Response.json({ message: 'Email not found' }, { status: 404 });
    }

  } catch (error) {
    return Response.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
};

export const revalidate = 10;
