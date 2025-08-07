'use client';

import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

const ReachHeatmap = () => {
  const HeatLayer = () => {
    const map = useMap();

    useEffect(() => {
      (async () => {
        const L = await import('leaflet');
        await import('leaflet.heat');

        const points = [
          [52.52, 13.405, 0.8], // Berlin
          [48.8566, 2.3522, 0.6], // Paris
          [40.7128, -74.006, 0.4], // New York
          [37.7749, -122.4194, 0.7], // San Francisco
        ];

        const heat = (L as any)
          .heatLayer(points, {
            radius: 25,
            gradient: { 0.1: 'blue', 0.2: 'lime' },
          })
          .addTo(map);
        return () => map.removeLayer(heat);
      })();
    }, [map]);

    return null;
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatLayer />
      </MapContainer>
    </Box>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const dataPostsPerMonth = [
  { month: 'Januar', posts: 5 },
  { month: 'Februar', posts: 8 },
  { month: 'März', posts: 6 },
  { month: 'April', posts: 10 },
];

const dataFollowerGrowth = [
  { month: 'Januar', followers: 20 },
  { month: 'Februar', followers: 50 },
  { month: 'März', followers: 40 },
  { month: 'April', followers: 70 },
];

const engagementData = [
  { type: 'Likes', value: 120, trend: 'up' },
  { type: 'Kommentare', value: 90, trend: 'down' },
  { type: 'Shares', value: 45, trend: 'up' },
];

const reachByRegion = [
  { region: 'Europa', value: 400 },
  { region: 'Nordamerika', value: 300 },
  { region: 'Asien', value: 200 },
  { region: 'Afrika', value: 100 },
];

const interactionTime = [
  { hour: '08:00', interactions: 30 },
  { hour: '12:00', interactions: 70 },
  { hour: '18:00', interactions: 90 },
  { hour: '23:00', interactions: 20 },
];

const fastestInteractions = [
  { type: 'Like', time: '10s' },
  { type: 'Kommentar', time: '20s' },
  { type: 'Share', time: '25s' },
  { type: 'Story-View', time: '5s' },
];

const slowestInteractions = [
  { type: 'Like', time: '12h' },
  { type: 'Kommentar', time: '8h' },
  { type: 'Share', time: '5h' },
  { type: 'Story-View', time: '2h' },
];

const topPosts = [
  { type: 'Meistgelikter Beitrag', title: 'Neues Projekt', value: 230 },
  { type: 'Meistkommentierter Beitrag', title: 'Feedback gesucht', value: 180 },
  { type: 'Meistgesehene Story', title: 'Behind the Scenes', value: 540 },
];

const mentions = [
  { user: 'techdaily', context: 'hat dich in einem Beitrag erwähnt' },
  { user: 'designhub', context: 'hat dich in einer Story markiert' },
];

const peerComparison = [
  { category: 'Beiträge', you: 12, average: 9 },
  { category: 'Kommentare', you: 24, average: 18 },
];

const profileViewsWeekly = [
  { week: 'KW 14', views: 150 },
  { week: 'KW 15', views: 180 },
  { week: 'KW 16', views: 160 },
];

export default function StatisticTab() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Statistiken
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <FormControl size="small">
            <InputLabel>Zeitraum</InputLabel>
            <Select
              label="Zeitraum"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="7d">Letzte 7 Tage</MenuItem>
              <MenuItem value="30d">Letzte 30 Tage</MenuItem>
              <MenuItem value="6m">Letzte 6 Monate</MenuItem>
              <MenuItem value="1y">Letztes Jahr</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3} width={5600}>
          <Grid sx={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Reichweite Heatmap</Typography>
                <ReachHeatmap />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
