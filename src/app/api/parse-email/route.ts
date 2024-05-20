import { NextRequest, NextResponse } from 'next/server';
import { parseEmailContent } from '../../../utils/ai';

export const POST = async (req: NextRequest) => {
  const { emailContent } = await req.json();
  try {
    const parsedData = await parseEmailContent(emailContent);
    return NextResponse.json(parsedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse email content' }, { status: 500 });
  }
};
