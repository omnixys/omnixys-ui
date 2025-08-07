'use client';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const postsPerMonth = [
  { month: 'Jan', posts: 4 },
  { month: 'Feb', posts: 6 },
  { month: 'Mär', posts: 9 },
  { month: 'Apr', posts: 12 },
  { month: 'Mai', posts: 10 },
];

const followerGrowth = [
  { month: 'Jan', followers: 120 },
  { month: 'Feb', followers: 180 },
  { month: 'Mär', followers: 250 },
  { month: 'Apr', followers: 320 },
  { month: 'Mai', followers: 450 },
];

const engagementAvg = [
  { type: 'Likes', value: 120 },
  { type: 'Kommentare', value: 80 },
  { type: 'Shares', value: 30 },
];

const reachByCountry = [
  { name: 'Deutschland', value: 400 },
  { name: 'Frankreich', value: 300 },
  { name: 'USA', value: 300 },
  { name: 'Italien', value: 200 },
];

export default function StatisticTab() {
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Deine Statistiken
      </Typography>

      <Grid container spacing={3}>
        {/* Beiträge pro Monat */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Beiträge pro Monat
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={postsPerMonth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="posts" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Follower-Wachstum */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Follower-Wachstum
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={followerGrowth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="followers" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Durchschnittliche Interaktionen */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Durchschnittliche Interaktionen
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={engagementAvg} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="type" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4caf50" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Reichweite nach Ländern */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Neue Follower nach Land
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={reachByCountry}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {reachByCountry.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
