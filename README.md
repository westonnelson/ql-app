# QuoteLinker - Life Insurance Lead Generation Platform

QuoteLinker is a modern lead generation platform built for life insurance agents. It captures high-intent leads through a multi-step quote form and provides a comprehensive dashboard for lead management.

## Features

- Multi-step quote form with real-time validation
- Lead scoring and qualification
- Admin dashboard with lead management
- UTM tracking and analytics
- CSV export functionality
- Secure authentication with Supabase
- Email notifications with Resend
- Responsive design optimized for conversion

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Email**: Resend
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4, PostHog

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/westonnelson/ql-app.git
   cd ql-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/quotelinker"

   # Email (Resend)
   RESEND_API_KEY=your-resend-api-key

   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   # Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
   NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

   # Site URL (for auth redirects)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Set up Supabase:
   - Create a new project at [Supabase](https://supabase.com)
   - Run the SQL migration in `supabase/migrations/20240410_create_leads_table.sql`
   - Copy your project URL and keys to the `.env` file

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. Create a new project on [Vercel](https://vercel.com)
3. Connect your GitHub repository
4. Add the following environment variables:
   ```
   RESEND_API_KEY=re_9zAwyPaJ_dQSLuTcbHuycFtJunXrW8UZF
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-5KYCRY1L8K
   NEXT_PUBLIC_POSTHOG_KEY=phc_8uSi1vqMdeNFIoWkBiC3tfGeCTlqsYt5VQk3H6kzQzL
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   NEXT_PUBLIC_APP_URL=https://quotelinker.com
   NEXT_PUBLIC_SITE_URL=https://quotelinker.com
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```

5. Deploy

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

## License

MIT License - see LICENSE.md

## Support

For support, email support@quotelinker.com or open an issue on GitHub.
