import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import mustache from 'mustache';
import connectToDatabase from '@/db/mongodb';
import Email from '@/db/models/Email';

// templates directory
const templatesDir = path.join(process.cwd(), 'src/app/templates');

// load template file
const loadTemplate = (fileName: string): string => {
  const filePath = path.join(templatesDir, fileName);
  return fs.readFileSync(filePath, 'utf-8');
};

// available email templates
const emailTemplateInStock = loadTemplate('emailTemplateInStock.mustache');
const emailTemplateOutOfStock = loadTemplate('emailTemplateOutOfStock.mustache');

export const POST = async (req: NextRequest) => {

  try {
    // getting email params
    const { quoteId, emailData, inStock } = await req.json();
    // define email template
    const template = inStock ? emailTemplateInStock : emailTemplateOutOfStock;
    // setting email content
    const emailContent = mustache.render(template, emailData);

    // connect to database
    await connectToDatabase();
    // saving generated email
    await Email.create({ quoteId, emailContent, inStock });
    
    return NextResponse.json({ message: 'Email saved successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }

};

export const revalidate = 0;
