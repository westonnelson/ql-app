import posthog from 'posthog-js'
import { PostHog } from 'posthog-js'

export const posthogClient: PostHog = posthog

// Check that PostHog is client-side
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // We'll handle this manually
    persistence: 'localStorage',
    autocapture: true,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    }
  })
} 