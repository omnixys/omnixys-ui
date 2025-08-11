"use client";

import * as React from "react";
import { Box, useTheme } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import { useIsMobile } from "../../hooks/use-mobile"; // <-- deine MUI-Variante des Hooks
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = 256;           // 16rem
const SIDEBAR_WIDTH_MOBILE = 288;    // 18rem
const SIDEBAR_WIDTH_ICON = 48;       // 3rem
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (v: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);
export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider.");
  return ctx;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  sx,
  style,
  children,
  ...props
}: React.ComponentProps<typeof Box> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const next = typeof value === "function" ? (value as any)(open) : value;
      if (setOpenProp) setOpenProp(next);
      else _setOpen(next);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((v) => !v) : setOpen((v) => !v);
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSidebar]);

  const state: "expanded" | "collapsed" = open ? "expanded" : "collapsed";

  const value = React.useMemo(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      <TooltipProvider delayDuration={0}>
        <Box
          data-slot="sidebar-wrapper"
          sx={{
            "--sidebar-width": `${SIDEBAR_WIDTH}px`,
            "--sidebar-width-icon": `${SIDEBAR_WIDTH_ICON}px`,
            display: "flex",
            minHeight: "100svh",
            width: "100%",
            ...(sx as any),
          }}
          style={style}
          {...props}
        >
          {children}
        </Box>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  sx,
  children,
  ...props
}: React.ComponentProps<typeof Box> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const theme = useTheme();
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  if (collapsible === "none") {
    return (
      <Box
        data-slot="sidebar"
        sx={{
          color: theme.palette.text.primary,
          display: "flex",
          flexDirection: "column",
          width: SIDEBAR_WIDTH,
          height: "100%",
          ...(sx as any),
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side={side}
          PaperProps={{
            sx: { width: SIDEBAR_WIDTH_MOBILE, p: 0, "& > .MuiBox-root": { height: "100%" } },
          }}
        >
          <SheetHeader sx={{ display: "none" }}>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>{children}</Box>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Gap + Container (für offcanvas/icon)
  const isFloatingOrInset = variant === "floating" || variant === "inset";

  return (
    <Box
      data-slot="sidebar"
      data-state={state}
      data-variant={variant}
      data-side={side}
      sx={{ color: "text.primary", display: { xs: "none", md: "block" } }}
    >
      {/* Gap steuert Layout-Verschiebung */}
      <Box
        data-slot="sidebar-gap"
        sx={{
          position: "relative",
          width: isCollapsed
            ? collapsible === "icon"
              ? (isFloatingOrInset ? SIDEBAR_WIDTH_ICON + 16 : SIDEBAR_WIDTH_ICON) // + spacing visual
              : 0
            : SIDEBAR_WIDTH,
          transition: "width .2s linear",
        }}
      />
      {/* Fixiertes Sidebar-Panel */}
      <Box
        data-slot="sidebar-container"
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          ...(side === "left" ? { left: isCollapsed && collapsible === "offcanvas" ? -SIDEBAR_WIDTH : 0 } : {}),
          ...(side === "right" ? { right: isCollapsed && collapsible === "offcanvas" ? -SIDEBAR_WIDTH : 0 } : {}),
          transition: (t) => t.transitions.create(["left", "right", "width"], { duration: 200, easing: "linear" }),
          height: "100svh",
          width:
            isCollapsed && collapsible === "icon"
              ? (isFloatingOrInset ? SIDEBAR_WIDTH_ICON + 16 + 2 : SIDEBAR_WIDTH_ICON) // +2 für evtl. Border
              : SIDEBAR_WIDTH,
          display: { xs: "none", md: "flex" },
          ...(isFloatingOrInset
            ? {
                p: 2,
              }
            : {
                borderRight: side === "left" ? `1px solid ${theme.palette.divider}` : undefined,
                borderLeft: side === "right" ? `1px solid ${theme.palette.divider}` : undefined,
              }),
          zIndex: 10,
        }}
        {...props}
      >
        <Box
          data-slot="sidebar-inner"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
            ...(variant === "floating" && {
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              boxShadow: 1,
            }),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export function SidebarTrigger({
  onClick,
  sx,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      sx={{ width: 28, height: 28, ...sx }}
      {...props}
    >
      <MenuOpenIcon fontSize="small" />
      <span style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>Toggle Sidebar</span>
    </Button>
  );
}

export function SidebarRail(props: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();
  // schmale Klick-Leiste am Rand
  return (
    <Box
      component="button"
      type="button"
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
      onClick={toggleSidebar}
      data-slot="sidebar-rail"
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 16,
        border: "none",
        background: "transparent",
        p: 0,
        cursor: "ew-resize",
        display: { xs: "none", sm: "block" },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 2,
          transform: "translateX(-50%)",
          backgroundColor: "divider",
        },
      }}
      {...props}
    />
  );
}

export function SidebarInset({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      component="main"
      data-slot="sidebar-inset"
      sx={{
        position: "relative",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        ...(sx as any),
      }}
      {...props}
    />
  );
}

export function SidebarInput(props: React.ComponentProps<typeof Input>) {
  return <Input data-slot="sidebar-input" {...props} />;
}

export function SidebarHeader({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box data-slot="sidebar-header" sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1, ...sx }} {...props} />
  );
}

export function SidebarFooter({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box data-slot="sidebar-footer" sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1, p: 1, ...sx }} {...props} />
  );
}

export function SidebarSeparator({ sx, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator data-slot="sidebar-separator" sx={{ mx: 1 }} {...props} />;
}

export function SidebarContent({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="sidebar-content"
      sx={{ minHeight: 0, flex: 1, display: "flex", flexDirection: "column", gap: 1, overflow: "auto", ...sx }}
      {...props}
    />
  );
}

export function SidebarGroup({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return <Box data-slot="sidebar-group" sx={{ position: "relative", width: "100%", minWidth: 0, p: 1, ...sx }} {...props} />;
}

export function SidebarGroupLabel({
  asChild,
  sx,
  children,
  ...props
}: React.ComponentProps<typeof Box> & { asChild?: boolean }) {
  const Comp: any = asChild ? "span" : Box;
  return (
    <Comp
      data-slot="sidebar-group-label"
      sx={{
        display: "flex",
        alignItems: "center",
        height: 32,
        px: 1,
        fontSize: 12,
        fontWeight: 600,
        color: "text.secondary",
        borderRadius: 1,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function SidebarGroupAction({
  asChild,
  showOnHover = false,
  sx,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean; showOnHover?: boolean }) {
  const Comp: any = asChild ? "span" : "button";
  return (
    <Box
      component={Comp}
      data-slot="sidebar-group-action"
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        width: 20,
        height: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        ...(showOnHover && { opacity: { md: 0 }, "&:hover,&:focus-within": { opacity: 1 } }),
        ...sx,
      }}
      {...props}
    />
  );
}

export function SidebarGroupContent({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return <Box data-slot="sidebar-group-content" sx={{ width: "100%", fontSize: 14, ...sx }} {...props} />;
}

export function SidebarMenu({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return <Box component="ul" data-slot="sidebar-menu" sx={{ m: 0, p: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 0.5, ...sx }} {...props} />;
}

export function SidebarMenuItem({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return <Box component="li" data-slot="sidebar-menu-item" sx={{ position: "relative" }} {...props} />;
}

type MenuButtonVariant = "default" | "outline";
type MenuButtonSize = "sm" | "default" | "lg";
export function SidebarMenuButton({
  asChild,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  sx,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  variant?: MenuButtonVariant;
  size?: MenuButtonSize;
}) {
  const { isMobile, state } = useSidebar();
  const Comp: any = asChild ? "span" : "button";

  const padding =
    size === "sm" ? 1 :
    size === "lg" ? { y: 1.25, x: 2 } :
    1; // default ~8px

  const height = size === "sm" ? 28 : size === "lg" ? 48 : 32;

  const buttonEl = (
    <Box
      component={Comp}
      data-slot="sidebar-menu-button"
      data-active={isActive ? "true" : "false"}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "100%",
        textAlign: "left",
        overflow: "hidden",
        borderRadius: 1,
        px: typeof padding === "number" ? padding : (padding as any).x ?? 1,
        py: typeof padding === "number" ? padding : (padding as any).y ?? 1,
        height,
        fontSize: size === "sm" ? 12 : 14,
        border: variant === "outline" ? (t) => `1px solid ${t.palette.divider}` : "none",
        backgroundColor: isActive ? "action.selected" : "transparent",
        color: isActive ? "text.primary" : "text.primary",
        cursor: "pointer",
        transition: "background-color .15s, color .15s",
        "&:hover": { backgroundColor: "action.hover" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );

  if (!tooltip) return buttonEl;

  const tooltipProps =
    typeof tooltip === "string"
      ? ({ children: tooltip } as React.ComponentProps<typeof TooltipContent>)
      : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{buttonEl as any}</TooltipTrigger>
      <TooltipContent side="right" align="center" sideOffset={6} hidden={state !== "collapsed" || isMobile} {...tooltipProps} />
    </Tooltip>
  );
}

export function SidebarMenuAction({ sx, showOnHover = false, ...props }: React.ComponentProps<"button"> & { showOnHover?: boolean }) {
  return (
    <Box
      component="button"
      data-slot="sidebar-menu-action"
      sx={{
        position: "absolute",
        top: 8,
        right: 6,
        width: 20,
        height: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        ...(showOnHover && { opacity: { md: 0 }, "&:hover,&:focus-within": { opacity: 1 } }),
        ...sx,
      }}
      {...props}
    />
  );
}

export function SidebarMenuBadge({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="sidebar-menu-badge"
      sx={{
        pointerEvents: "none",
        position: "absolute",
        right: 6,
        top: 8,
        minWidth: 20,
        height: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 0.5,
        fontSize: 11,
        borderRadius: 1,
        bgcolor: "action.selected",
        color: "text.primary",
        ...sx,
      }}
      {...props}
    />
  );
}

export function SidebarMenuSkeleton({ showIcon = false, sx, ...props }: React.ComponentProps<typeof Box> & { showIcon?: boolean }) {
  const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return (
    <Box data-slot="sidebar-menu-skeleton" sx={{ display: "flex", alignItems: "center", gap: 1, height: 32, px: 1, borderRadius: 1, ...sx }} {...props}>
      {showIcon && <Skeleton variant="rectangular" width={16} height={16} sx={{ borderRadius: 1 }} />}
      <Skeleton variant="rectangular" height={16} sx={{ flex: 1, maxWidth: width }} />
    </Box>
  );
}

export function SidebarMenu({ className, ...props }: any); // (Dummy-Overload um Brüche bei Re-Exports zu vermeiden)
export function SidebarMenuSub({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      component="ul"
      data-slot="sidebar-menu-sub"
      sx={{
        m: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        borderLeft: (t) => `1px solid ${t.palette.divider}`,
        ml: 2.5,
        pl: 2,
        py: 0.5,
      }}
      {...props}
    />
  );
}
export function SidebarMenuSubItem({ sx, ...props }: React.ComponentProps<typeof Box>) {
  return <Box component="li" data-slot="sidebar-menu-sub-item" sx={{ position: "relative" }} {...props} />;
}
export function SidebarMenuSubButton({
  asChild,
  size = "md",
  isActive = false,
  sx,
  children,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean; size?: "sm" | "md"; isActive?: boolean }) {
  const Comp: any = asChild ? "span" : "a";
  return (
    <Box
      component={Comp}
      data-slot="sidebar-menu-sub-button"
      data-active={isActive ? "true" : "false"}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        minWidth: 0,
        height: size === "sm" ? 28 : 32,
        px: 1,
        fontSize: size === "sm" ? 12 : 14,
        borderRadius: 1,
        ml: -1,
        textDecoration: "none",
        color: "text.primary",
        backgroundColor: isActive ? "action.selected" : "transparent",
        "&:hover": { backgroundColor: "action.hover" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export {
  // re-exports für Namenskompatibilität
  // (die oben schon exportierten Namen bleiben erhalten)
};
