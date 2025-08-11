"use client";

import * as React from "react";
import {
  Drawer,
  type DrawerProps,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Side = "top" | "right" | "bottom" | "left";

type SheetCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  side: Side;
  setSide: (s: Side) => void;
};
const SheetContext = React.createContext<SheetCtx | null>(null);
const useSheet = () => {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("Sheet components must be used within <Sheet />");
  return ctx;
};

export type SheetProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: Side;
  children: React.ReactNode;
};

export function Sheet({
  open,
  defaultOpen,
  onOpenChange,
  side = "right",
  children,
}: SheetProps) {
  const [uOpen, setUOpen] = React.useState(!!defaultOpen);
  const isCtrl = open !== undefined;
  const stateOpen = isCtrl ? !!open : uOpen;
  const setOpen = React.useCallback(
    (v: boolean) => {
      if (!isCtrl) setUOpen(v);
      onOpenChange?.(v);
    },
    [isCtrl, onOpenChange]
  );
  const [position, setSide] = React.useState<Side>(side);

  const value = React.useMemo(
    () => ({ open: stateOpen, setOpen, side: position, setSide }),
    [stateOpen, setOpen, position]
  );

  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
}

export type SheetTriggerProps = {
  asChild?: boolean;
  children: React.ReactElement;
};
export function SheetTrigger({ asChild, children }: SheetTriggerProps) {
  const { open, setOpen } = useSheet();
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(!open);
    children.props.onClick?.(e);
  };
  return asChild
    ? React.cloneElement(children, { onClick, "data-slot": "sheet-trigger" })
    : (
      <Box
        component="button"
        type="button"
        onClick={onClick}
        data-slot="sheet-trigger"
        sx={{ appearance: "none", border: 0, background: "none", p: 0, m: 0, cursor: "pointer" }}
      >
        {children}
      </Box>
    );
}

export function SheetClose({
  asChild,
  children,
  ...props
}: { asChild?: boolean } & React.ComponentProps<typeof IconButton>) {
  const { setOpen } = useSheet();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    (props as any)?.onClick?.(e);
  };
  const btn = (
    <IconButton
      size="small"
      aria-label="Close"
      data-slot="sheet-close"
      onClick={onClick}
      {...props}
    >
      {children ?? <CloseIcon fontSize="small" />}
    </IconButton>
  );
  return asChild ? btn : btn;
}

export function SheetPortal({ children }: { children: React.ReactNode }) {
  // MUI portalt intern; wir reichen nur durch für API-Kompatibilität
  return <>{children}</>;
}

export type SheetContentProps = Omit<DrawerProps, "open" | "anchor" | "onClose"> & {
  side?: Side;
  /** Zusätzliche Styles für das innere Content-Wrapper-Box */
  contentSx?: object;
};

export function SheetContent({
  side = "right",
  children,
  PaperProps,
  contentSx,
  ...props
}: SheetContentProps) {
  const { open, setOpen, setSide } = useSheet();
  React.useEffect(() => setSide(side), [side, setSide]);

  const isHorizontal = side === "left" || side === "right";
  const isVertical = !isHorizontal;

  return (
    <Drawer
      data-slot="sheet-content"
      open={open}
      anchor={side}
      onClose={() => setOpen(false)}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          // Größen wie im Original: 75% Breite, max. sm
          ...(isHorizontal && { width: { xs: "75vw", sm: 360 } }),
          ...(isVertical && { height: "auto" }),
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 24,
        },
        ...PaperProps,
      }}
      {...props}
    >
      <Box sx={{ position: "relative", p: 2 }}>
        {/* absolute Close in der Ecke */}
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <SheetClose />
        </Box>
        <Box sx={{ ...contentSx }}>{children}</Box>
      </Box>
    </Drawer>
  );
}

export function SheetHeader({
  sx,
  ...props
}: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="sheet-header"
      sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 2, ...sx }}
      {...props}
    />
  );
}

export function SheetFooter({
  sx,
  ...props
}: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="sheet-footer"
      sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1, p: 2, ...sx }}
      {...props}
    />
  );
}

export function SheetTitle({
  children,
  sx,
  ...props
}: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      data-slot="sheet-title"
      variant="h6"
      sx={{ fontWeight: 600, ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function SheetDescription({
  children,
  sx,
  ...props
}: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      data-slot="sheet-description"
      variant="body2"
      color="text.secondary"
      sx={{ ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default Sheet;
