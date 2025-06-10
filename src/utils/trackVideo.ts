// utils/trackVideo.ts
export function trackVideoEvent(
    action: string,
    label: string,
    value?: number
): void {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", action, {
            event_category: "Video",
            event_label: label,
            value,
        });
    }
}
  