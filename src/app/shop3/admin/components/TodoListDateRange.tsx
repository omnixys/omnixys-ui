"use client";

import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// Range-Komponenten sind im PRO-Paket
import { DateRangeCalendar, type DateRange } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { format } from "date-fns";

import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

const initialItems = [
  { id: 1, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: true },
  { id: 2, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: true },
  { id: 3, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: false },
  { id: 4, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: false },
  { id: 5, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: false },
  { id: 6, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: false },
  { id: 7, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: false },
  { id: 8, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: false },
  { id: 9, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: true },
  { id: 10, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: true },
  { id: 11, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: true },
  { id: 12, text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.", checked: true },
];

const TodoListDateRange = () => {
  const [range, setRange] = useState<DateRange<Date>>([new Date(), null]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialItems);

  const label = useMemo(() => {
    const [start, end] = range;
    if (start && end) return `${format(start, "PPP")} — ${format(end, "PPP")}`;
    if (start) return `${format(start, "PPP")} — …`;
    return "Pick a date range";
  }, [range]);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Todo List
      </Typography>

      {/* Date Range Picker im Popover */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            sx={{ width: "100%" }}
            startIcon={<CalendarMonthIcon fontSize="small" />}
          >
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangeCalendar
              value={range}
              onChange={(newRange) => {
                setRange(newRange);
                const [s, e] = newRange;
                if (s && e) setOpen(false);
              }}
              calendars={2}
              // Optik via sx
              sx={{
                "& .MuiPickersCalendarHeader-label": { fontWeight: 600 },
                "& .MuiPickersDay-root.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": { bgcolor: "primary.dark" },
                },
                "& .MuiPickersDay-today": {
                  border: (t) => `1px solid ${t.palette.primary.main}`,
                },
              }}
            />
          </LocalizationProvider>
        </PopoverContent>
      </Popover>

      {/* LISTE */}
      <ScrollArea sx={{ maxHeight: 400, mt: 2, overflowY: "auto" }}>
        <Stack spacing={2}>
          {items.map((item) => {
            const htmlId = `todo-item-${item.id}`;
            return (
              <Card key={item.id} sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Checkbox
                    id={htmlId}
                    checked={item.checked}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((it) =>
                          it.id === item.id ? { ...it, checked: e.target.checked } : it
                        )
                      )
                    }
                  />
                  <CardContent sx={{ p: 0 }}>
                    <Typography
                      component="label"
                      htmlFor={htmlId}
                      variant="body2"
                      color="text.secondary"
                      sx={{ cursor: "pointer" }}
                    >
                      {item.text}
                    </Typography>
                  </CardContent>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </ScrollArea>
    </Box>
  );
};

export default TodoListDateRange;
