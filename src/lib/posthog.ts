'use client'

import posthog from 'posthog-js'
import { PostHog } from 'posthog-js'

let posthogClient: PostHog | null = null

// Initialize PostHog only on the client side
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthogClient = posthog
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: false, // We'll handle this manually
    persistence: 'localStorage',
    autocapture: true,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    }
  })
}

export { posthogClient } 