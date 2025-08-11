/**
 * Pfad: data/brain.mock.ts
 * Beschreibung: Konfiguration/Mock-Daten für Rotationswinkel.
 * So bleiben Zahlenwerte aus dem Component-Code ausgelagert und leicht änderbar/testing-freundlich.
 */

export const rotationConfig = {
    // Vorwärtsdrehungen in Grad (bei scrollYProgress: 0 → 1)
    forward: [360, 180, 90, 45],
    // Rückwärtsdrehungen in Grad
    backward: [-360, -180, -90, -45],
  } as const;
