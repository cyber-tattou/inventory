# Inventory Management System

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## App Architecture

The Inventory Management System is built using Next.js, leveraging its server-side rendering capabilities for optimal performance and SEO. The application is structured as follows:
- **Frontend**: Utilizes React components for a dynamic user interface, with pages organized in the `app` directory.
- **Backend**: Implements API routes for CRUD operations, connecting to an SQLite database for data persistence.
- **Database**: SQLite is used to store product, supplier, invoice, and stock movement data, with automatic table creation on startup.

## Database Improvements

- **SQLite Integration**: The application now uses SQLite for data storage, ensuring lightweight and efficient data management.
- **Automatic Table Creation**: Tables for products, suppliers, invoices, and stock movements are created automatically if they do not exist, simplifying setup.
- **CRUD Operations**: Full CRUD functionality is implemented for all entities, allowing for seamless data manipulation.

## Key Features

- **User Authentication**: Role-based access control is implemented, allowing only authorized users to perform certain actions.
- **Dynamic Forms**: Forms for adding and editing products, suppliers, and stock movements are dynamically generated based on user input.
- **Data Visualization**: The application provides a clear overview of inventory and stock movements, enhancing user experience.
- **Responsive Design**: The UI is designed to be responsive, ensuring usability across different devices.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Dashboard Improvements

- The initial values for inventory counts have been adjusted to start in the hundreds instead of thousands for better usability and testing.
