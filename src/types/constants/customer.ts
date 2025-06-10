import { CustomerState } from "../person/enums";

// 🌟 Tier Level Mapping
export const tierLevels: Record<number, { label: string; color: string }> = {
    1: { label: "🥉 Basic", color: "#CD7F32" },
    2: { label: "🥈 Elite", color: "#C0C0C0" },
    3: { label: "🥇 Supreme", color: "#FFD700" },
};

// 🛠 Status-Farben Mapping
export const statusColors: Record<CustomerState, { label: string; color: 'success' | 'error' | 'warning' | 'default' | 'info' | 'secondary' }> = {
    ACTIVE: { label: "Aktiv", color: "success" },
    BLOCKED: { label: "Blockiert", color: "error" },
    INACTIVE: { label: "Inaktiv", color: "warning" },
    CLOSED: { label: "Geschlossen", color: "default" },
    PENDING: { label: "Ausstehend", color: "info" },
    SUSPENDED: { label: "Suspendiert", color: "secondary" },
};

// Branding-Farben laut Omnixys
export const ACTION_COLORS = {
    inspect: "#4E3792", // Dunkles Lila
    edit: "#6A4BBC", // Primärfarbe
    delete: "#F87171", // Inaktiv-Status
};

export const ACTION_TOOLTIPS = {
    inspect: "Anzeigen",
    edit: "Bearbeiten",
    delete: "Löschen",
};
  
// const genderMapping = {
//   MALE: { label: "Männlich", icon: <Male sx={{ color: "#6A4BBC" }} /> },
//   FEMALE: { label: "Weiblich", icon: <Female sx={{ color: "#6A4BBC" }} /> },
//   NON_BINARY: {
//     label: "Nicht-binär",
//     icon: <Transgender sx={{ color: "#6A4BBC" }} />,
//   },
//   OTHER: { label: "Andere", icon: <People sx={{ color: "#6A4BBC" }} /> },
// };

// const maritalStatusMapping = {
//   SINGLE: {
//     label: "Ledig",
//     icon: <FavoriteBorder sx={{ color: "#6A4BBC" }} />,
//   },
//   MARRIED: {
//     label: "Verheiratet",
//     icon: <Favorite sx={{ color: "#6A4BBC" }} />,
//   },
//   DIVORCED: { label: "Geschieden", icon: <Close sx={{ color: "#6A4BBC" }} /> },
//   WIDOWED: { label: "Verwitwet", icon: <People sx={{ color: "#6A4BBC" }} /> },
// };

// const tierLevels = {
//   "1": { label: "Basic", icon: "🥉" },
//   "2": { label: "Elite", icon: "🥈" },
//   "3": { label: "Supreme", icon: "🥇" },
// };

// const customerStates = {
//   ACTIVE: { label: "🟢 Aktiv", color: "success" },
//   BLOCKED: { label: "🔴 Blockiert", color: "error" },
//   INACTIVE: { label: "🟠 Inaktiv", color: "warning" },
//   CLOSED: { label: "⚪ Geschlossen", color: "default" },
//   PENDING: { label: "🔵 Ausstehend", color: "info" },
//   SUSPENDED: { label: "🟣 Suspendiert", color: "secondary" },
// };
