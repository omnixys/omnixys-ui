"use client";

import * as React from "react";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Dayjs } from "dayjs";

export default function Calendar({
  value,
  onChange,
  disablePast = false,
  showOutsideDays = true,
}: {
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
  disablePast?: boolean;
  showOutsideDays?: boolean;
}) {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DateCalendar
        value={value}
        onChange={onChange}
        disablePast={disablePast}
        showDaysOutsideCurrentMonth={showOutsideDays}
        slots={{
          leftArrowIcon: ChevronLeft,
          rightArrowIcon: ChevronRight,
          day: (props) => (
            <PickersDay
              {...props}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
                "&.MuiPickersDay-today": {
                  border: "1px solid",
                  borderColor: "primary.main",
                },
              }}
            />
          ),
        }}
        sx={{
          "& .MuiPickersCalendarHeader-label": {
            fontWeight: "bold",
          },
          "& .MuiPickersArrowSwitcher-root": {
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDayCalendar-weekDayLabel": {
            fontSize: "0.8rem",
            color: "text.secondary",
          },
        }}
      />
    </Box>
  );
}
