"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";

type OrderItem = {
  name: string;
  price: number;
};

type Order = {
  id: string;
  createdAt: string; // ISO-String
  orderAmount: number;
  address?: string;
  zipCode?: string;
  orderDetail?: OrderItem[];
};

export default function MyOrdersPage() {
  const [orderList, setOrderList] = useState<Order[]>([]);

  useEffect(() => {
    // Lade Bestellungen aus localStorage
    const ordersRaw =
      typeof window !== "undefined" ? window.localStorage.getItem("orders") : null;
    const lastOrderRaw =
      typeof window !== "undefined" ? window.localStorage.getItem("lastOrder") : null;

    let list: Order[] = [];

    if (ordersRaw) {
      try {
        list = JSON.parse(ordersRaw) as Order[];
      } catch {
        list = [];
      }
    }

    if (lastOrderRaw) {
      try {
        const last = JSON.parse(lastOrderRaw) as Order;
        // falls noch nicht in "orders" enthalten, hinzufügen
        if (last?.id && !list.some((o) => o.id === last.id)) {
          list.push(last);
        }
      } catch {
        // ignore
      }
    }

    // sortieren: neueste zuerst
    list.sort((a, b) => {
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return tb - ta;
    });

    setOrderList(list);
  }, []);

  const hasOrders = useMemo(() => orderList.length > 0, [orderList]);

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        My Orders
      </Typography>

      {!hasOrders ? (
        <Typography color="text.secondary">No orders yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {orderList.map((order) => (
            <Grid item xs={12} md={6} key={order.id}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Stack spacing={1.2}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {moment(order.createdAt).format("DD-MMM-YYYY")}
                  </Typography>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" fontWeight={600}>
                      Order Total Amount
                    </Typography>
                    <Typography variant="body2">
                      ${Number(order.orderAmount).toFixed(2)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Address</Typography>
                    <Typography variant="body2" textAlign="right">
                      {order.address ?? "-"}
                      {order.zipCode ? `, ${order.zipCode}` : ""}
                    </Typography>
                  </Stack>

                  <Accordion sx={{ mt: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography color="primary" sx={{ textDecoration: "underline" }}>
                        View Order Detail
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={1}>
                        {(order.orderDetail ?? []).map((item, idx) => (
                          <Stack
                            key={`${order.id}-${idx}-${item.name}`}
                            direction="row"
                            justifyContent="space-between"
                          >
                            <Typography variant="body2">{item.name}</Typography>
                            <Typography variant="body2">
                              ${Number(item.price).toFixed(2)}
                            </Typography>
                          </Stack>
                        ))}
                        <Divider sx={{ my: 0.5 }} />
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="subtitle2" fontWeight={700}>
                            Total Order Amount (Including Taxes)
                          </Typography>
                          <Typography variant="subtitle2" fontWeight={700}>
                            ${Number(order.orderAmount).toFixed(2)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
