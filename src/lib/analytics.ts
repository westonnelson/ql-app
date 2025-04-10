import { posthogClient } from './posthog'

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  try {
    posthogClient.capture(eventName, properties)
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

// Conversion events
export const trackQuoteStart = () => {
  trackEvent('quote_start')
}

export const trackQuoteComplete = (quoteData: any) => {
  trackEvent('quote_complete', {
    ...quoteData,
    timestamp: new Date().toISOString(),
  })
}

export const trackLeadGenerated = (leadData: any) => {
  trackEvent('lead_generated', {
    ...leadData,
    timestamp: new Date().toISOString(),
  })
}

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  })
}

// Page view tracking (in addition to automatic tracking)
export const trackPageView = (url: string) => {
  trackEvent('$pageview', {
    $current_url: url,
  })
} 