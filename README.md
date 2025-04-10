# QuoteLinker - Life Insurance Lead Generation Platform

QuoteLinker is a modern lead generation platform built for life insurance agents. It captures high-intent leads through a multi-step quote form and provides a comprehensive dashboard for lead management.

## Features

- Multi-step quote form with real-time validation
- Lead scoring and qualification
- Admin dashboard with lead management
- UTM tracking and analytics
- CSV export functionality
- Secure authentication with Clerk
- Responsive design optimized for conversion

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Clerk
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quotelinker.git
   cd quotelinker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create a .env file with the following variables
   DATABASE_URL="postgresql://user:password@localhost:5432/quotelinker"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── (marketing)/       # Public marketing pages
│   └── api/               # API routes
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── forms/            # Form components
│   ├── shared/           # Shared components
│   └── ui/               # UI components
├── lib/                  # Utility functions and helpers
├── hooks/                # Custom React hooks
└── types/                # TypeScript type definitions
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key
- `CLERK_SECRET_KEY`: Clerk secret key
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID (optional)

## Deployment

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Add environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - see LICENSE.md

## Support

For support, email support@quotelinker.com or open an issue on GitHub.
