import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import mustache from 'mustache';

const emailsFilePath = path.join(process.cwd(), 'emails-db.json');
const templatesDir = path.join(process.cwd(), 'src/app/templates');

if (!fs.existsSync(emailsFilePath)) {
  fs.writeFileSync(emailsFilePath, JSON.stringify([]), 'utf-8');
}

const loadTemplate = (fileName: string): string => {
  const filePath = path.join(templatesDir, fileName);
  return fs.readFileSync(filePath, 'utf-8');
};

const emailTemplateInStock = loadTemplate('emailTemplateInStock.mustache');
const emailTemplateOutOfStock = loadTemplate('emailTemplateOutOfStock.mustache');

const saveEmailsToFile = (emails: any[]): void => {
  fs.writeFileSync(emailsFilePath, JSON.stringify(emails, null, 2), 'utf-8');
};

const getEmailsFromFile = (): any[] => {
  const fileContents = fs.readFileSync(emailsFilePath, 'utf-8');
  return JSON.parse(fileContents);
};

export const POST = async (req: NextRequest) => {
  const { quoteId, emailData, inStock } = await req.json();
  const emails = getEmailsFromFile();
  const template = inStock ? emailTemplateInStock : emailTemplateOutOfStock;
  const emailContent = mustache.render(template, emailData);

  emails.push({ quoteId, emailContent, inStock });
  saveEmailsToFile(emails);

  return NextResponse.json({ message: 'Email saved successfully' }, { status: 200 });
};
