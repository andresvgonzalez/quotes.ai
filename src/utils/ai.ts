import { OpenAI } from "openai";
import { RFQData } from "../types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const parseEmailContent = async (
  emailContent: string
): Promise<RFQData | null> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that extracts structured RFQ data from emails. For the detected Due Date, return a valid Date Object for the current year. Always respond in the following JSON format: { "customer": "Customer Name", "products": [ { "name": "Product Name", "quantity": X, dimensions: X, materialSpecifications: X } ], "dueDate": "Due Date", "shippingRestrictions": "Shipping Restrictions" }',
        },
        {
          role: 'user',
          content: `Extract RFQ details from the following email:\n\n${emailContent}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    const { choices } = response;

    if (!choices || choices.length === 0 || !choices[0].message.content) {
      throw new Error("No choices returned from OpenAI API");
    }

    const messageContent = choices[0].message.content;
    const rfqData: RFQData = JSON.parse(messageContent);

    return rfqData;
  } catch (error: any) {
    console.error(
      "Error calling OpenAI API:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to call OpenAI API");
  }
};
