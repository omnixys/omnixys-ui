'use client';

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
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

const dataPostsPerMonth = [
  { month: 'Jan', posts: 12 },
  { month: 'Feb', posts: 18 },
  { month: 'Mar', posts: 24 },
  { month: 'Apr', posts: 15 },
  { month: 'Mai', posts: 20 },
  { month: 'Jun', posts: 28 },
  { month: 'Jul', posts: 31 },
];

const dataFollowerGrowth = [
  { month: 'Jan', followers: 150 },
  { month: 'Feb', followers: 180 },
  { month: 'Mar', followers: 220 },
  { month: 'Apr', followers: 260 },
  { month: 'Mai', followers: 310 },
  { month: 'Jun', followers: 360 },
  { month: 'Jul', followers: 420 },
];

const engagementData = [
  { type: 'Likes', current: 320, previous: 280 },
  { type: 'Kommentare', current: 140, previous: 160 },
  { type: 'Shares', current: 50, previous: 45 },
];

const reachByRegion = [
  { name: 'Deutschland', value: 240 },
  { name: 'USA', value: 140 },
  { name: 'Frankreich', value: 90 },
  { name: 'Kanada', value: 60 },
];

const interactionTime = [
  { hour: '00:00', count: 5 },
  { hour: '06:00', count: 40 },
  { hour: '09:00', count: 90 },
  { hour: '12:00', count: 120 },
  { hour: '15:00', count: 100 },
  { hour: '18:00', count: 80 },
  { hour: '21:00', count: 60 },
];

const fastestInteractions = [
  { type: 'Like', time: '3s' },
  { type: 'Kommentar', time: '9s' },
  { type: 'Share', time: '15s' },
  { type: 'Story-View', time: '5s' },
];

const slowestInteractions = [
  { type: 'Like', time: '2h' },
  { type: 'Kommentar', time: '3h' },
  { type: 'Share', time: '1h 45min' },
  { type: 'Story-View', time: '4h' },
];

const topPosts = [
  { label: 'Meistgelikter Beitrag', value: 'Was ist Omnixys?', count: 540 },
  {
    label: 'Meistkommentierter Beitrag',
    value: 'Meine Reise mit AI',
    count: 220,
  },
  { label: 'Meistgesehene Story', value: 'Kaffee + Code ☕️', count: 890 },
];

const mentions = [
  { label: 'Erwähnungen im Juli', value: 12 },
  { label: 'Erwähnungen im Juni', value: 6 },
];

const peerComparison = [
  { metric: 'Beiträge/Monat', du: 28, peerAvg: 17 },
  { metric: 'Kommentare/Monat', du: 140, peerAvg: 70 },
  { metric: 'Likes/Monat', du: 320, peerAvg: 180 },
];

const profileViewsWeekly = [
  { week: 'KW 26', views: 120 },
  { week: 'KW 27', views: 140 },
  { week: 'KW 28', views: 150 },
  { week: 'KW 29', views: 170 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function StatisticTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Statistiken
        </Typography>

        {/* Beiträge pro Monat */}
        <Typography variant="h6" mt={4}>
          Beiträge pro Monat
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataPostsPerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="posts" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        {/* Follower Wachstum */}
        <Typography variant="h6" mt={4}>
          Follower-Wachstum
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dataFollowerGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="followers"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Interaktionen */}
        <Typography variant="h6" mt={4}>
          Durchschnittliche Interaktionen
        </Typography>
        <Grid container spacing={2}>
          {engagementData.map((item) => {
            const diff = item.current - item.previous;
            const up = diff >= 0;
            return (
              <Grid item xs={12} md={4} key={item.type}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.type}
                    </Typography>
                    <Typography>
                      {item.current} (
                      {up ? (
                        <ArrowDropUp color="success" />
                      ) : (
                        <ArrowDropDown color="error" />
                      )}{' '}
                      {Math.abs(diff)})
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Reichweite */}
        <Typography variant="h6" mt={4}>
          Reichweite nach Ländern
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={reachByRegion}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {reachByRegion.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        {/* Aktivste Uhrzeiten */}
        <Typography variant="h6" mt={4}>
          Interaktionen nach Uhrzeit
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={interactionTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        {/* Schnellste & langsamste Interaktionen */}
        <Typography variant="h6" mt={4}>
          Schnellste Interaktionen
        </Typography>
        <Grid container spacing={2}>
          {fastestInteractions.map((item) => (
            <Grid item xs={6} md={3} key={item.type}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2">{item.type}</Typography>
                  <Typography>{item.time}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" mt={4}>
          Langsamste Interaktionen
        </Typography>
        <Grid container spacing={2}>
          {slowestInteractions.map((item) => (
            <Grid item xs={6} md={3} key={item.type}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2">{item.type}</Typography>
                  <Typography>{item.time}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Top Beiträge */}
        <Typography variant="h6" mt={4}>
          Top-Beiträge
        </Typography>
        <Grid container spacing={2}>
          {topPosts.map((post) => (
            <Grid item xs={12} md={4} key={post.label}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2">{post.label}</Typography>
                  <Typography fontWeight="bold">{post.value}</Typography>
                  <Typography variant="caption">
                    {post.count} Interaktionen
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Erwähnungen */}
        <Typography variant="h6" mt={4}>
          Erwähnungen
        </Typography>
        <Grid container spacing={2}>
          {mentions.map((m) => (
            <Grid item xs={12} md={6} key={m.label}>
              <Card>
                <CardContent>
                  <Typography>{m.label}</Typography>
                  <Typography fontWeight="bold">{m.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Vergleich zu Peers */}
        <Typography variant="h6" mt={4}>
          Du vs. Durchschnitt
        </Typography>
        <Grid container spacing={2}>
          {peerComparison.map((item) => (
            <Grid item xs={12} md={4} key={item.metric}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2">{item.metric}</Typography>
                  <Typography>Du: {item.du}</Typography>
                  <Typography>Durchschnitt: {item.peerAvg}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Profilaufrufe */}
        <Typography variant="h6" mt={4}>
          Profilaufrufe pro Woche
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={profileViewsWeekly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#ff7300"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </motion.div>
  );
}
