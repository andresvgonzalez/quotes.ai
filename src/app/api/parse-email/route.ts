import { parseEmailContent } from '../../../utils/ai';

export const POST = async (req: Request) => {
  const { emailContent } = await req.json();
  try {
    const parsedData = await parseEmailContent(emailContent);
    return Response.json(parsedData, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Failed to parse email content' }, { status: 500 });
  }
};
