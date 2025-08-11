"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { Box, Paper, Stack, Typography, GlobalStyles } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

type ChartContainerProps = React.ComponentProps<typeof Box> & {
  id?: string;
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
};

/**
 * MUI-only ChartContainer:
 * - Keine Tailwind-Klassen
 * - Basis-Styles via GlobalStyles und MUI Theme
 */
function ChartContainer({
  id,
  sx,
  children,
  config,
  ...props
}: ChartContainerProps) {
  const theme = useTheme();
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      {/* Basis-GlobalStyles für Recharts unterhalb dieses Containers */}
      <GlobalStyles
        styles={{
          [`[data-chart='${chartId}'] .recharts-layer`]: { outline: "none" },
          [`[data-chart='${chartId}'] .recharts-surface`]: { outline: "none" },
          [`[data-chart='${chartId}'] .recharts-sector`]: {
            outline: "none",
            stroke: "transparent",
          },
          [`[data-chart='${chartId}'] .recharts-dot`]: {
            stroke: "transparent",
          },
          [`[data-chart='${chartId}'] .recharts-cartesian-axis-tick text`]: {
            fill: theme.palette.text.secondary,
            fontSize: 12,
          },
          [`[data-chart='${chartId}'] .recharts-cartesian-grid line[stroke='#ccc']`]:
            {
              stroke: theme.palette.divider,
              opacity: 0.5,
            },
          [`[data-chart='${chartId}'] .recharts-curve.recharts-tooltip-cursor`]:
            {
              stroke: theme.palette.divider,
            },
          [`[data-chart='${chartId}'] .recharts-rectangle.recharts-tooltip-cursor`]:
            {
              fill: theme.palette.action.hover,
            },
          [`[data-chart='${chartId}'] .recharts-reference-line [stroke='#ccc']`]:
            {
              stroke: theme.palette.divider,
            },
          [`[data-chart='${chartId}'] .recharts-polar-grid [stroke='#ccc']`]: {
            stroke: theme.palette.divider,
          },
          [`[data-chart='${chartId}'] .recharts-radial-bar-background-sector`]:
            {
              fill: theme.palette.action.selected,
            },
        }}
      />

      <Box
        data-slot="chart"
        data-chart={chartId}
        sx={{
          display: "flex",
          aspectRatio: "16/9",
          justifyContent: "center",
          fontSize: 12,
          ...sx,
        }}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </Box>
    </ChartContext.Provider>
  );
}

/**
 * Beibehaltung der CSS-Variablen-Logik für Farbschemata.
 */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => (cfg as any).theme || (cfg as any).color
  );

  if (!colorConfig.length) return null;

  return (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart='${id}'] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      (itemConfig as any).theme?.[theme as keyof typeof THEMES] ||
      (itemConfig as any).color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

/**
 * MUI-only Tooltip-Content für Recharts <Tooltip content={<ChartTooltipContent .../>} />
 */
function ChartTooltipContent({
  active,
  payload,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  nameKey,
  labelKey,
  sx,
  ...paperProps
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<typeof Paper> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  }) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;

    const [item] = payload as any[];
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? (config as any)[label]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {labelFormatter(value, payload as any)}
        </Typography>
      );
    }
    if (!value) return null;
    return (
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    );
  }, [label, labelFormatter, payload, hideLabel, config, labelKey]);

  if (!active || !payload?.length) return null;

  const items = payload as any[];
  const nestLabel = items.length === 1 && indicator !== "dot";

  return (
    <Paper
      elevation={6}
      sx={{
        minWidth: "8rem",
        p: 1.25,
        borderRadius: 1.25,
        border: (t) => `1px solid ${t.palette.divider}`,
        display: "grid",
        gap: 1,
        ...sx,
      }}
      {...paperProps}
    >
      {!nestLabel ? tooltipLabel : null}

      <Stack spacing={0.75}>
        {items.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = (item?.payload?.fill as string) || item.color;

          return (
            <Stack
              key={item.dataKey ?? index}
              direction="row"
              spacing={1}
              alignItems={indicator === "dot" ? "center" : "stretch"}
              sx={{
                "& > svg": {
                  width: 10,
                  height: 10,
                  color: (t) => t.palette.text.secondary,
                },
              }}
            >
              {/* Icon / Indicator */}
              {itemConfig?.icon ? (
                <itemConfig.icon />
              ) : !hideIndicator ? (
                <Box
                  sx={{
                    flexShrink: 0,
                    borderRadius: 0.5,
                    bgcolor:
                      indicator === "dashed" ? "transparent" : indicatorColor,
                    border:
                      indicator === "dashed"
                        ? `1.5px dashed ${indicatorColor}`
                        : `1px solid ${indicatorColor}`,
                    width: indicator === "dot" ? 10 : indicator === "line" ? 4 : 0,
                    height: indicator === "dot" ? 10 : "auto",
                    my: indicator === "dashed" && nestLabel ? 0.5 : 0,
                  }}
                />
              ) : null}

              {/* Text */}
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  alignItems: nestLabel ? "flex-end" : "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box>
                  {nestLabel ? tooltipLabel : null}
                  <Typography
                    variant="caption"
                    sx={{ color: (t) => t.palette.text.secondary }}
                  >
                    {itemConfig?.label || item.name}
                  </Typography>
                </Box>

                {item.value != null && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontWeight: 600,
                    }}
                  >
                    {Number(item.value).toLocaleString()}
                  </Typography>
                )}
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </Paper>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

/**
 * MUI-only Legend-Content für Recharts <Legend content={<ChartLegendContent .../>} />
 */
function ChartLegendContent({
  payload,
  verticalAlign = "bottom",
  hideIcon = false,
  nameKey,
  sx,
  ...boxProps
}: React.ComponentProps<typeof Box> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  }) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        pt: verticalAlign === "top" ? 0 : 1.5,
        pb: verticalAlign === "top" ? 1.5 : 0,
        ...sx,
      }}
      {...boxProps}
    >
      {payload.map((item: any, idx: number) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <Stack
            key={item.value ?? idx}
            direction="row"
            spacing={0.75}
            alignItems="center"
            sx={{ "& > svg": { width: 12, height: 12, color: "text.secondary" } }}
          >
            {!hideIcon ? (
              itemConfig?.icon ? (
                <itemConfig.icon />
              ) : (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: 0.5,
                    bgcolor: item.color,
                    flexShrink: 0,
                  }}
                />
              )
            ) : null}
            <Typography variant="caption">{itemConfig?.label}</Typography>
          </Stack>
        );
      })}
    </Box>
  );
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) return undefined;

  const payloadPayload =
    "payload" in (payload as any) &&
    typeof (payload as any).payload === "object" &&
    (payload as any).payload !== null
      ? (payload as any).payload
      : undefined;

  let configLabelKey: string = key;

  if (key in (payload as any) && typeof (payload as any)[key] === "string") {
    configLabelKey = (payload as any)[key] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key] as string;
  }

  return configLabelKey in config
    ? (config as any)[configLabelKey]
    : (config as any)[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
