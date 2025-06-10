// utils/trackVideo.ts
export function trackVideoEvent(
    action: string,
    label: string = "Omnixys Vorschau",
    value?: number
) {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
            event_category: "Video",
            event_label: label,
            value,
        });
    }
}
  