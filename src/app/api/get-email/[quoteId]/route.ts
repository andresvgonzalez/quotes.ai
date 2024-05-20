import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const emailsFilePath = path.join(process.cwd(), 'emails-db.json');

const getEmailsFromFile = (): any[] => {
  const fileContents = fs.readFileSync(emailsFilePath, 'utf-8');
  return JSON.parse(fileContents);
};

export const GET = async (req: NextRequest, context: { params: { quoteId: string } }) => {
  const { quoteId } = context.params;
  const emails = getEmailsFromFile();
  const email = emails.find(email => email.quoteId === quoteId);

  if (email) {
    return NextResponse.json({ emailContent: email.emailContent }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Email not found' }, { status: 404 });
  }
};
