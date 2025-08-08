'use client';

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
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
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const cardStyle = {
  borderRadius: 3,
  boxShadow: 3,
  p: 2,
  height: '100%',
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

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Beiträge pro Monat</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dataPostsPerMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="posts" fill={COLORS[0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Follower Wachstum</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={dataFollowerGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="followers"
                      stroke={COLORS[1]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Durchschnittliche Interaktionen
                </Typography>
                <Grid container spacing={2}>
                  {engagementData.map((item) => (
                    <Grid item xs={12} sm={4} key={item.type}>
                      <Typography>{item.type}</Typography>
                      <Typography variant="h6">
                        {item.value}{' '}
                        {item.trend === 'up' ? (
                          <ArrowDropUp color="success" />
                        ) : (
                          <ArrowDropDown color="error" />
                        )}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Reichweite nach Region</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={reachByRegion}
                      dataKey="value"
                      nameKey="region"
                      outerRadius={80}
                      label
                    >
                      {reachByRegion.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Aktivität nach Uhrzeit</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={interactionTime}>
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="interactions" fill={COLORS[2]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Ergänzte Komponenten */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Schnellste Interaktionen</Typography>
                <Grid container spacing={2}>
                  {fastestInteractions.map((item) => (
                    <Grid item xs={6} md={3} key={item.type}>
                      <Typography>{item.type}</Typography>
                      <Typography variant="body2">{item.time}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Langsamste Interaktionen</Typography>
                <Grid container spacing={2}>
                  {slowestInteractions.map((item) => (
                    <Grid item xs={6} md={3} key={item.type}>
                      <Typography>{item.type}</Typography>
                      <Typography variant="body2">{item.time}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top-Beiträge</Typography>
                <Grid container spacing={2}>
                  {topPosts.map((item) => (
                    <Grid item xs={12} md={4} key={item.title}>
                      <Typography>{item.type}</Typography>
                      <Typography variant="subtitle1">{item.title}</Typography>
                      <Typography variant="caption">
                        {item.value} Interaktionen
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Erwähnungen</Typography>
                <Grid container spacing={2}>
                  {mentions.map((item, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Typography>
                        @{item.user} – {item.context}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Kategorievergleich: Du vs. Durchschnitt
                </Typography>
                <Grid container spacing={2}>
                  {peerComparison.map((item) => (
                    <Grid item xs={12} sm={6} key={item.category}>
                      <Typography>{item.category}</Typography>
                      <Typography variant="body2">Du: {item.you}</Typography>
                      <Typography variant="body2">
                        Durchschnitt: {item.average}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Profilaufrufe pro Woche</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={profileViewsWeekly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke={COLORS[3]} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
