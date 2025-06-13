export {};

declare global {
  interface Window {
    gtag?: (type: 'event', action: string, params: GtagEventParams) => void;
  }

  interface GtagEventParams {
    event_category: string;
    event_label: string;
    value?: number;
  }
}
