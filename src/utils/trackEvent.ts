export type TrackEventName = 'phone_click' | 'generate_lead' | 'directions_click';

const conversionSendTo: Record<TrackEventName, string> = {
  phone_click: import.meta.env.PUBLIC_GADS_PHONE_SEND_TO || '',
  generate_lead: import.meta.env.PUBLIC_GADS_LEAD_SEND_TO || '',
  directions_click: import.meta.env.PUBLIC_GADS_DIRECTIONS_SEND_TO || '',
};

type Gtag = (...args: unknown[]) => void;

/** Zdarzenie do GTM i, gdy jest etykieta, konwersja Google Ads. */
export function trackEvent(name: TrackEventName) {
  if (typeof window === 'undefined') return;

  const w = window as Window & { dataLayer?: unknown[]; gtag?: Gtag };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name });

  if (typeof w.gtag !== 'function') return;

  w.gtag('event', name);

  const sendTo = conversionSendTo[name];
  if (sendTo) {
    w.gtag('event', 'conversion', { send_to: sendTo });
  }
}
