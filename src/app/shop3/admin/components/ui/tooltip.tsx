"use client";

import * as React from "react";
import { Tooltip as MuiTooltip, type TooltipProps, Box } from "@mui/material";

/** Provider: globale Defaults (Delay etc.) */
type ProviderValue = {
  enterDelay: number;
  leaveDelay: number;
};
const TooltipProviderCtx = React.createContext<ProviderValue>({ enterDelay: 0, leaveDelay: 0 });

export function TooltipProvider({
  delayDuration = 0,
  children,
}: { delayDuration?: number; children: React.ReactNode }) {
  return (
    <TooltipProviderCtx.Provider value={{ enterDelay: delayDuration, leaveDelay: 0 }}>
      {children}
    </TooltipProviderCtx.Provider>
  );
}

/** Tooltip Root */
type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

type TooltipCtx = {
  content: React.ReactNode;
  setContent: (node: React.ReactNode) => void;
  placement: Side;
  setPlacement: (s: Side) => void;
  align: Align;
  setAlign: (a: Align) => void;
  sideOffset: number;
  setSideOffset: (n: number) => void;
};
const Ctx = React.createContext<TooltipCtx | null>(null);

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [content, setContent] = React.useState<React.ReactNode>(null);
  const [placement, setPlacement] = React.useState<Side>("top");
  const [align, setAlign] = React.useState<Align>("center");
  const [sideOffset, setSideOffset] = React.useState<number>(0);

  const value = React.useMemo(
    () => ({ content, setContent, placement, setPlacement, align, setAlign, sideOffset, setSideOffset }),
    [content, placement, align, sideOffset]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function useTooltipCtx() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("TooltipTrigger/TooltipContent must be used within <Tooltip>.");
  return ctx;
}

/** Trigger: rendert das Kind und hängt den MUI-Tooltip an */
export function TooltipTrigger({
  asChild = false,
  children,
  ...rest
}: { asChild?: boolean; children: React.ReactElement } & Omit<TooltipProps, "title" | "children" | "placement">) {
  const { content, placement, align, sideOffset } = useTooltipCtx();
  const { enterDelay, leaveDelay } = React.useContext(TooltipProviderCtx);

  // Map Radix placement + align → MUI placement
  const placementMap = (side: Side, a: Align): TooltipProps["placement"] => {
    const horiz = a === "start" ? "start" : a === "end" ? "end" : "";
    if (side === "top") return (`top${horiz ? `-${horiz}` : ""}` as TooltipProps["placement"]);
    if (side === "bottom") return (`bottom${horiz ? `-${horiz}` : ""}` as TooltipProps["placement"]);
    if (side === "left") return (`left${horiz ? `-${horiz}` : ""}` as TooltipProps["placement"]);
    return (`right${horiz ? `-${horiz}` : ""}` as TooltipProps["placement"]);
  };

  const child = asChild ? children : <Box component="span">{children}</Box>;

  return (
    <MuiTooltip
      title={content}
      placement={placementMap(placement, align)}
      arrow
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      componentsProps={{
        tooltip: {
          sx: (t) => ({
            // Optik wie im Original: primärer Hintergrund, kleine Rundung
            bgcolor: t.palette.primary.main,
            color: t.palette.primary.contrastText,
            px: 1.5,
            py: 1,
            fontSize: 12,
            borderRadius: 1,
            // Abstand wie sideOffset
            ...(placement.startsWith("top") && { mb: sideOffset }),
            ...(placement.startsWith("bottom") && { mt: sideOffset }),
            ...(placement.startsWith("left") && { mr: sideOffset }),
            ...(placement.startsWith("right") && { ml: sideOffset }),
          }),
        },
        arrow: {
          sx: (t) => ({
            color: t.palette.primary.main,
          }),
        },
      }}
      {...rest}
    >
      {child}
    </MuiTooltip>
  );
}

/** Content: registriert den Tooltip-Inhalt & optional Platzierung */
export function TooltipContent({
  children,
  className, // nur zur API-Kompatibilität – wird ignoriert
  sideOffset = 0,
  side = "top",
  align = "center",
  ..._props
}: {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  side?: Side;
  align?: Align;
}) {
  const { setContent, setPlacement, setAlign, setSideOffset } = useTooltipCtx();

  // Registriere Content/Props beim Mount
  React.useEffect(() => {
    setContent(children);
    setPlacement(side);
    setAlign(align);
    setSideOffset(sideOffset);
    // Cleanup: entferne Content, wenn unmounted
    return () => setContent(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, side, align, sideOffset]);

  // MUI rendert den Bubble selbst – hier nichts anzeigen
  return null;
}
