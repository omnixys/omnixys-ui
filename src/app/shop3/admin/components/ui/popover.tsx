"use client";

import * as React from "react";
import {
  Popover as MuiPopover,
  type PopoverProps as MuiPopoverProps,
  Box,
} from "@mui/material";

type Align = "start" | "center" | "end";
type Side = "top" | "right" | "bottom" | "left";

type PopoverContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
};

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverCtx() {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) throw new Error("Popover components must be used inside <Popover />");
  return ctx;
}

export type PopoverRootProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

export function Popover({ open, defaultOpen, onOpenChange, children }: PopoverRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(!!defaultOpen);
  const isControlled = open !== undefined;
  const stateOpen = isControlled ? !!open : uncontrolledOpen;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const setOpen = React.useCallback(
    (v: boolean) => {
      if (!isControlled) setUncontrolledOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange]
  );

  const value = React.useMemo(
    () => ({ open: stateOpen, setOpen, anchorEl, setAnchorEl }),
    [stateOpen, setOpen, anchorEl]
  );

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
}

/** Trigger: setzt anchorEl und toggelt open */
export type PopoverTriggerProps = {
  asChild?: boolean;
  children: React.ReactElement;
};

export function PopoverTrigger({ asChild, children }: PopoverTriggerProps) {
  const { open, setOpen, setAnchorEl } = usePopoverCtx();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget as HTMLElement);
    setOpen(!open);
    children.props.onClick?.(e);
  };

  if (asChild) {
    return React.cloneElement(children, {
      onClick: handleClick,
      "data-slot": "popover-trigger",
    });
  }

  // Default: span-Wrapper (behält Layout unverändert)
  return (
    <Box
      component="span"
      data-slot="popover-trigger"
      onClick={handleClick}
      sx={{ display: "inline-flex", cursor: "pointer" }}
    >
      {children}
    </Box>
  );
}

/** Optionaler Anchor: überschreibt den Trigger als Anker */
export type PopoverAnchorProps = React.ComponentProps<typeof Box>;

export function PopoverAnchor({ children, ...props }: PopoverAnchorProps) {
  const { setAnchorEl } = usePopoverCtx();
  return (
    <Box
      data-slot="popover-anchor"
      ref={setAnchorEl as any}
      {...props}
      sx={{ display: "inline-flex", ...(props as any).sx }}
    >
      {children}
    </Box>
  );
}

export type PopoverContentProps = Omit<MuiPopoverProps, "open" | "anchorEl"> & {
  /** Ausrichtung wie bei Radix: start | center | end */
  align?: Align;
  /** Seite relativ zum Anchor: top | right | bottom | left */
  side?: Side;
  /** Abstand in px zwischen Anchor & Content */
  sideOffset?: number;
  /** Optional zusätzliche Styles für das Paper */
  paperSx?: MuiPopoverProps["slotProps"];
};

export function PopoverContent({
  align = "center",
  side = "bottom",
  sideOffset = 4,
  paperSx,
  onClose,
  transformOrigin,
  anchorOrigin,
  ...props
}: PopoverContentProps) {
  const { open, setOpen, anchorEl } = usePopoverCtx();

  // Map Radix-Props -> MUI Origins
  const horiz: "left" | "center" | "right" =
    align === "start" ? "left" : align === "end" ? "right" : "center";

  const anchorVert: "top" | "bottom" | "center" =
    side === "top" ? "top" : side === "bottom" ? "bottom" : "center";
  const anchorHoriz: "left" | "right" | "center" =
    side === "left" ? "left" : side === "right" ? "right" : "center";

  const transformVert: "top" | "bottom" | "center" =
    side === "top" ? "bottom" : side === "bottom" ? "top" : "center";
  const transformHoriz: "left" | "right" | "center" = horiz;

  // Offset als margin in die jeweilige Richtung
  const offsetSx =
    side === "bottom"
      ? { mt: sideOffset }
      : side === "top"
      ? { mb: sideOffset }
      : side === "right"
      ? { ml: sideOffset }
      : { mr: sideOffset };

  return (
    <MuiPopover
      data-slot="popover-content"
      open={open}
      anchorEl={anchorEl}
      onClose={(e, reason) => {
        setOpen(false);
        onClose?.(e, reason);
      }}
      // Defaults können via Props überschrieben werden
      anchorOrigin={anchorOrigin ?? { vertical: anchorVert, horizontal: anchorHoriz }}
      transformOrigin={transformOrigin ?? { vertical: transformVert, horizontal: transformHoriz }}
      slotProps={{
        paper: {
          sx: {
            width: 288, // ~ w-72
            borderRadius: 1,
            p: 2,
            boxShadow: 6,
            outline: "none",
            // Farbanmutung wie früher: bg-popover / text-popover-foreground
            bgcolor: "background.paper",
            color: "text.primary",
            border: (t) => `1px solid ${t.palette.divider}`,
            ...offsetSx,
            ...(paperSx as any)?.paper?.sx,
          },
        },
      }}
      {...props}
    />
  );
}

export default Popover;
