# Quote AI Application

## Overview

This application uses AI to automate the process of turning customer emailed requests for quotes (RFQs) into structured quotes. It includes features for managing quotes, submitting RFQs, and viewing inventory.

## Features

- **Dashboard**: View and manage draft and sent quotes.
- **Submit RFQs**: Submit email content for RFQ parsing.
- **Inventory**: View current inventory.

## Technology Stack

- **Next.js 14**
- **TypeScript**
- **Mustache.js** for email templating
- **OpenAI GPT-4** for email parsing

## Project Structure

```
app/
  api/
    inventory/
      route.ts
    save-email/
      route.ts
    get-email/
      [quoteId]/
        route.ts
    send-quote/
      route.ts
    update-quote/
      route.ts
    remove-quote/
      route.ts
    parse-email/
      route.ts
  components/
    Dashboard/
      Dashboard.tsx
      Dashboard.scss
    Inventory/
      Inventory.tsx
    SubmitRFQ/
      SubmitRFQ.tsx
    Layout/
      Layout.tsx
  dashboard/
    page.tsx
  inventory/
    page.tsx
  submit-rfq/
    page.tsx
utils/
  types.ts
  storage.ts
templates/
  emailTemplateInStock.mustache
  emailTemplateOutOfStock.mustache
styles/
  layout/
    _layout.scss
  globals.scss
emails-db.json
quotes-db.json
inventory.json
```

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd quote.ai
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Dashboard

- Access the dashboard at `/dashboard`.
- View and manage draft and sent quotes.
- Edit quotes, update prices, and send quotes.

### Submit RFQs

- Access the RFQ submission page at `/submit-rfq`.
- Enter email content and submit it for parsing.

### Inventory

- Access the inventory page at `/inventory`.
- View the current inventory of products.

## API Endpoints

### `GET /api/inventory`

Fetches the current inventory.

### `POST /api/save-email`

Saves email content based on stock availability.

### `GET /api/get-email/[quoteId]`

Fetches the email content for a specific quote ID.

### `POST /api/send-quote`

Marks a quote as sent and saves the email content.

### `POST /api/update-quote`

Updates an existing quote with new information.

### `POST /api/remove-quote`

Removes a quote by its ID.

### `POST /api/parse-email`

Parses the email content using OpenAI GPT-4 to extract RFQ details.


## License

...
