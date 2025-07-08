import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Divider,
} from '@mui/material';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const salesData = [
  { month: 'Jan', sales: 10 },
  { month: 'Feb', sales: 7 },
  { month: 'Mar', sales: 15 },
  { month: 'Apr', sales: 25 },
  { month: 'May', sales: 36 },
  { month: 'Jun', sales: 30 },
  { month: 'Jul', sales: 35 },
  { month: 'Aug', sales: 45 },
  { month: 'Sep', sales: 40 },
  { month: 'Oct', sales: 25 },
  { month: 'Nov', sales: 25 },
  { month: 'Dec', sales: 34 },
];


const recentTransactions = [
  { name: 'Jagarnath S.', date: '24.05.2023', amount: '$124.97', status: 'Paid' },
  { name: 'Anand G.', date: '23.05.2023', amount: '$55.42', status: 'Pending' },
  { name: 'Kartik S.', date: '23.05.2023', amount: '$89.90', status: 'Paid' },
  { name: 'Rakesh S.', date: '22.05.2023', amount: '$144.94', status: 'Pending' },
  { name: 'Anup S.', date: '22.05.2023', amount: '$70.52', status: 'Paid' },
  { name: 'Jimmy P.', date: '22.05.2023', amount: '$70.52', status: 'Paid' },
];

const topProductsByUnits = [
  { name: 'Men Grey Hoodie', price: '$49.90', units: 204 },
  { name: 'Women Striped T-Shirt', price: '$34.90', units: 155 },
  { name: 'Women White T-Shirt', price: '$40.90', units: 120 },
  { name: 'Men White T-Shirt', price: '$49.90', units: 204 },
  { name: 'Women Red T-Shirt', price: '$34.90', units: 155 },
];

const topSellingProducts = [
  {
    title: 'Healthcare Erbology',
    subtitle: 'in Accessories',
    sales: '13,153',
    img: 'https://i.ibb.co/F5PzXYq/product.png', 
  },
  {
    title: 'Healthcare Erbology',
    subtitle: 'in Accessories',
    sales: '13,153',
    img: 'https://i.ibb.co/F5PzXYq/product.png',
  },
  {
    title: 'Healthcare Erbology',
    subtitle: 'in Accessories',
    sales: '13,153',
    img: 'https://i.ibb.co/F5PzXYq/product.png',
  },
  {
    title: 'Healthcare Erbology',
    subtitle: 'in Accessories',
    sales: '13,153',
    img: 'https://i.ibb.co/F5PzXYq/product.png',
  },
  {
    title: 'Healthcare Erbology',
    subtitle: 'in Accessories',
    sales: '13,153',
    img: 'https://i.ibb.co/F5PzXYq/product.png',
  },
];

function StatusChip({ status }) {
  const color = status === 'Paid' ? 'success' : 'default';
  return <Chip label={status} color={color} size="small" />;
}

export default function Dashboard() {
  return (
    <Box p={3}  minHeight="100vh">
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              bgcolor: 'rgb(210, 13, 13)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Sales
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              $152k
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              bgcolor: 'yellow',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Cost
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              $99.7k
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              bgcolor: '#d7f5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Profit
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              $32.1k
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* График и Top selling products */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Sales Revenue
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1" fontWeight={600}>
                Top selling products
              </Typography>
              <Button size="small">See All &rarr;</Button>
            </Box>
            <List dense sx={{ overflowY: 'auto' }}>
              {topSellingProducts.map((prod, i) => (
                <ListItem key={i} disablePadding secondaryAction={
                  <Typography variant="body2" color="success.main" fontWeight={600}>
                    {prod.sales}
                  </Typography>
                }>
                  <ListItemAvatar>
                    <Avatar src={prod.img} variant="rounded" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={prod.title}
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {prod.subtitle}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent transactions и Top Products by Units Sold */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Recent Transactions
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentTransactions.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>
                        <StatusChip status={row.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Top Products by Units Sold
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Units</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProductsByUnits.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.units}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
