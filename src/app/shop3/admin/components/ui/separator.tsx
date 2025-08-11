"use client";

import * as React from "react";
import Divider, { DividerProps } from "@mui/material/Divider";

type SeparatorProps = Omit<DividerProps, "orientation" | "flexItem"> & {
  orientation?: "horizontal" | "vertical";
  /** Nur fürs A11y – wenn nicht dekorativ, bekommt das Element kein role="presentation". */
  decorative?: boolean;
};

export function Separator({
  orientation = "horizontal",
  decorative = true,
  sx,
  ...props
}: SeparatorProps) {
  return (
    <Divider
      // Wenn dekorativ, keine semantische Rolle
      role={decorative ? "presentation" : undefined}
      orientation={orientation}
      // Bei vertikalem Divider flexItem setzen, damit die Höhe sich am Container orientiert
      flexItem={orientation === "vertical"}
      sx={sx}
      {...props}
    />
  );
}

export default Separator;


// "use client";

// import * as React from "react";
// import Divider, { type DividerProps } from "@mui/material/Divider";

// export type SeparatorProps = Omit<DividerProps, "orientation"> & {
//   orientation?: "horizontal" | "vertical";
//   decorative?: boolean;
// };

// /**
//  * Separator – MUI-only Ersatz für Radix-Separator
//  * - horizontal oder vertikal
//  * - optional dekorativ (keine ARIA-Rolle)
//  */
// export function Separator({
//   orientation = "horizontal",
//   decorative = true,
//   sx,
//   ...props
// }: SeparatorProps) {
//   return (
//     <Divider
//       orientation={orientation}
//       role={decorative ? undefined : "separator"}
//       flexItem={orientation === "vertical"}
//       sx={{
//         bgcolor: "divider", // entspricht bg-border
//         ...(orientation === "horizontal"
//           ? { width: "100%", height: 1 }
//           : { height: "100%", width: 1 }),
//         ...sx,
//       }}
//       {...props}
//     />
//   );
// }

// export default Separator;
