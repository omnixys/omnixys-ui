"use client";

import * as React from "react";
import {
  Menu,
  MenuItem,
  MenuList,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  type MenuProps,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

type Align = "start" | "center" | "end";
type Side = "top" | "right" | "bottom" | "left";

type DropdownCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
};
const DropdownMenuContext = React.createContext<DropdownCtx | null>(null);
const useDropdown = () => {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error("Dropdown components must be used inside <DropdownMenu />");
  return ctx;
};

export type DropdownMenuProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};
export function DropdownMenu({ open, defaultOpen, onOpenChange, children }: DropdownMenuProps) {
  const [uOpen, setUOpen] = React.useState(!!defaultOpen);
  const isCtrl = open !== undefined;
  const stateOpen = isCtrl ? !!open : uOpen;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const setOpen = React.useCallback(
    (v: boolean) => {
      if (!isCtrl) setUOpen(v);
      onOpenChange?.(v);
    },
    [isCtrl, onOpenChange]
  );

  const value = React.useMemo(
    () => ({ open: stateOpen, setOpen, anchorEl, setAnchorEl }),
    [stateOpen, setOpen, anchorEl]
  );

  return <DropdownMenuContext.Provider value={value}>{children}</DropdownMenuContext.Provider>;
}

export function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export type DropdownMenuTriggerProps = {
  asChild?: boolean;
  children: React.ReactElement;
};
export function DropdownMenuTrigger({ asChild, children }: DropdownMenuTriggerProps) {
  const { open, setOpen, setAnchorEl } = useDropdown();
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget as HTMLElement);
    setOpen(!open);
    children.props.onClick?.(e);
  };
  return asChild
    ? React.cloneElement(children, { onClick: handleClick, "data-slot": "dropdown-menu-trigger" })
    : (
      <Box component="span" onClick={handleClick} sx={{ display: "inline-flex", cursor: "pointer" }} data-slot="dropdown-menu-trigger">
        {children}
      </Box>
    );
}

export type DropdownMenuContentProps = Omit<MenuProps, "open" | "anchorEl"> & {
  sideOffset?: number;
  align?: Align;
  side?: Side;
  /** zusätzliche Paper-Styles */
  paperSx?: object;
};
export function DropdownMenuContent({
  sideOffset = 4,
  align = "start",
  side = "bottom",
  paperSx,
  onClose,
  children,
  ...props
}: DropdownMenuContentProps) {
  const { open, setOpen, anchorEl } = useDropdown();

  const anchorOrigin = {
    vertical: side === "top" ? "top" : side === "bottom" ? "bottom" : "center",
    horizontal: side === "left" ? "left" : side === "right" ? "right" : (align === "end" ? "right" : align === "start" ? "left" : "center"),
  } as const;

  const transformOrigin = {
    vertical: side === "top" ? "bottom" : side === "bottom" ? "top" : "center",
    horizontal: align === "end" ? "right" : align === "start" ? "left" : "center",
  } as const;

  const offsetSx =
    side === "bottom" ? { mt: sideOffset } :
    side === "top" ? { mb: sideOffset } :
    side === "right" ? { ml: sideOffset } : { mr: sideOffset };

  return (
    <Menu
      data-slot="dropdown-menu-content"
      open={open}
      anchorEl={anchorEl}
      onClose={(e, r) => { setOpen(false); onClose?.(e, r); }}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      MenuListProps={{ dense: true, sx: { py: 0.5, maxHeight: 360, overflowY: "auto" } }}
      PaperProps={{
        sx: {
          minWidth: 128,
          borderRadius: 1,
          boxShadow: 6,
          border: (t) => `1px solid ${t.palette.divider}`,
          overflow: "hidden",
          ...offsetSx,
          ...(paperSx as any),
        },
      }}
      {...props}
    >
      {children}
    </Menu>
  );
}

export function DropdownMenuGroup({ children }: { children: React.ReactNode }) {
  return <MenuList dense disablePadding>{children}</MenuList>;
}

export type DropdownMenuItemProps = React.ComponentProps<typeof MenuItem> & {
  inset?: boolean;
  variant?: "default" | "destructive";
};
export function DropdownMenuItem({
  inset,
  variant = "default",
  sx,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <MenuItem
      data-slot="dropdown-menu-item"
      sx={{
        gap: 8,
        px: 1,
        py: 0.75,
        borderRadius: 0.75,
        mx: 0.5,
        ...(inset && { pl: 3 }),
        ...(variant === "destructive" && {
          color: "error.main",
          "&:hover": { bgcolor: "error.light", color: "error.contrastText" },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MenuItem>
  );
}

export type DropdownMenuCheckboxItemProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
};
export function DropdownMenuCheckboxItem({
  checked = false,
  onCheckedChange,
  disabled,
  children,
}: DropdownMenuCheckboxItemProps) {
  return (
    <MenuItem
      data-slot="dropdown-menu-checkbox-item"
      dense
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      sx={{ gap: 1, px: 1, py: 0.75, mx: 0.5, borderRadius: 0.75 }}
    >
      <ListItemIcon sx={{ minWidth: 20 }}>
        {checked ? <CheckIcon fontSize="small" /> : <Box sx={{ width: 18, height: 18 }} />}
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: "body2" }}>
        {children}
      </ListItemText>
    </MenuItem>
  );
}

type RadioCtx = {
  value?: string;
  onValueChange?: (v: string) => void;
};
const DropdownMenuRadioCtx = React.createContext<RadioCtx | null>(null);

export function DropdownMenuRadioGroup({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
}) {
  const ctx = React.useMemo(() => ({ value, onValueChange }), [value, onValueChange]);
  return <DropdownMenuRadioCtx.Provider value={ctx}>{children}</DropdownMenuRadioCtx.Provider>;
}

export function DropdownMenuRadioItem({
  value,
  children,
  disabled,
}: {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const ctx = React.useContext(DropdownMenuRadioCtx);
  const selected = ctx?.value === value;
  return (
    <MenuItem
      data-slot="dropdown-menu-radio-item"
      dense
      disabled={disabled}
      onClick={() => ctx?.onValueChange?.(value)}
      sx={{ gap: 1, px: 1, py: 0.75, mx: 0.5, borderRadius: 0.75 }}
    >
      <ListItemIcon sx={{ minWidth: 20 }}>
        {selected ? <RadioButtonCheckedIcon fontSize="small" /> : <RadioButtonUncheckedIcon fontSize="small" />}
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: "body2" }}>
        {children}
      </ListItemText>
    </MenuItem>
  );
}

export function DropdownMenuLabel({
  inset,
  children,
  sx,
  ...props
}: { inset?: boolean } & React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      data-slot="dropdown-menu-label"
      variant="caption"
      sx={{ px: 1, py: 1, fontWeight: 600, ...(inset && { pl: 3 }), ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function DropdownMenuSeparator(props: React.ComponentProps<typeof Divider>) {
  return <Divider data-slot="dropdown-menu-separator" sx={{ my: 0.5 }} {...props} />;
}

export function DropdownMenuShortcut({
  children,
  sx,
  ...props
}: React.ComponentProps<"span"> & { sx?: any }) {
  return (
    <Box
      component="span"
      data-slot="dropdown-menu-shortcut"
      sx={{ ml: "auto", fontSize: 12, letterSpacing: "0.08em", color: "text.secondary", ...sx }}
      {...props}
    >
      {children}
    </Box>
  );
}

/** Submenus */
type SubCtx = {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};
const DropdownSubCtx = React.createContext<SubCtx | null>(null);

export function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const value = React.useMemo(() => ({ anchorEl, setAnchorEl, open, setOpen }), [anchorEl, open]);
  return <DropdownSubCtx.Provider value={value}>{children}</DropdownSubCtx.Provider>;
}

export function DropdownMenuSubTrigger({
  inset,
  children,
  sx,
  ...props
}: { inset?: boolean } & React.ComponentProps<typeof MenuItem>) {
  const sub = React.useContext(DropdownSubCtx);
  if (!sub) throw new Error("SubTrigger must be used within DropdownMenuSub");

  return (
    <MenuItem
      data-slot="dropdown-menu-sub-trigger"
      onMouseEnter={(e) => { sub.setAnchorEl(e.currentTarget as HTMLElement); sub.setOpen(true); }}
      onMouseLeave={() => sub.setOpen(false)}
      onClick={(e) => { sub.setAnchorEl(e.currentTarget as HTMLElement); sub.setOpen((v) => !v); }}
      sx={{ px: 1, py: 0.75, mx: 0.5, borderRadius: 0.75, ...(inset && { pl: 3 }), ...sx }}
      {...props}
    >
      <Box component="span" sx={{ flex: 1 }}>{children}</Box>
      <ChevronRightIcon fontSize="small" />
    </MenuItem>
  );
}

export function DropdownMenuSubContent({
  sideOffset = 6,
  paperSx,
  ...props
}: { sideOffset?: number; paperSx?: object } & Omit<MenuProps, "open" | "anchorEl">) {
  const sub = React.useContext(DropdownSubCtx);
  if (!sub) throw new Error("SubContent must be used within DropdownMenuSub");

  return (
    <Menu
      data-slot="dropdown-menu-sub-content"
      open={sub.open}
      anchorEl={sub.anchorEl}
      onClose={() => sub.setOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      MenuListProps={{ dense: true, sx: { py: 0.5 } }}
      PaperProps={{
        sx: {
          minWidth: 128,
          ml: sideOffset,
          borderRadius: 1,
          boxShadow: 6,
          border: (t) => `1px solid ${t.palette.divider}`,
          ...(paperSx as any),
        },
      }}
      {...props}
    />
  );
}
