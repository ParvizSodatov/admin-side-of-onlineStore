import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ordersData = [
  { id: '#12512B', date: 'May 5, 4:20 PM', customer: 'Tom Anderson', paymentStatus: 'Paid', orderStatus: 'Ready', total: '$49.90' },
  { id: '#12523C', date: 'May 5, 4:15 PM', customer: 'Jayden Walker', paymentStatus: 'Paid', orderStatus: 'Ready', total: '$34.36' },
  { id: '#51232A', date: 'May 5, 4:15 PM', customer: 'Inez Kim', paymentStatus: 'Paid', orderStatus: 'Ready', total: '$5.51' },
  { id: '#23534D', date: 'May 5, 4:12 PM', customer: 'Francisco Henry', paymentStatus: 'Paid', orderStatus: 'Shipped', total: '$29.74' },
  { id: '#51323C', date: 'May 5, 4:12 PM', customer: 'Violet Phillips', paymentStatus: 'Paid', orderStatus: 'Shipped', total: '$23.06' },
  { id: '#35622A', date: 'May 5, 4:12 PM', customer: 'Rosetta Becker', paymentStatus: 'Paid', orderStatus: 'Shipped', total: '$87.44' },
  { id: '#34232D', date: 'May 5, 4:10 PM', customer: 'Dean Love', paymentStatus: 'Paid', orderStatus: 'Ready', total: '$44.55' },
  { id: '#56212D', date: 'May 5, 4:08 PM', customer: 'Nettie Tyler', paymentStatus: 'Paid', orderStatus: 'Ready', total: '$36.79' },
  { id: '#23534D', date: 'May 5, 4:04 PM', customer: 'Miguel Harris', paymentStatus: 'Pending', orderStatus: 'Ready', total: '$50.54' },
  { id: '#12523C', date: 'May 5, 4:04 PM', customer: 'Angel Conner', paymentStatus: 'Pending', orderStatus: 'Ready', total: '$63.47' },
  { id: '#51232A', date: 'May 5, 4:03 PM', customer: 'Rosalie Singleton', paymentStatus: 'Pending', orderStatus: 'Received', total: '$91.63' },
];

const paymentStatusColors = {
  Paid: 'success.main',
  Pending: 'grey.500',
};

const orderStatusColors = {
  Ready: '#ff8c00', // оранжевый
  Shipped: '#5a5a75', // серо-синий
  Received: '#007bff', // синий
};

export default function Orders() {
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState('Newest');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ordersData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // Фильтрация и поиск (упрощённо)
  const filteredData = ordersData.filter(order => 
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  // Пагинация
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Orders</Typography>
        <Button variant="contained" color="primary">+ Add order</Button>
      </Box>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchIcon /></InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <Select
          size="small"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          sx={{ width: 150 }}
        >
          <MenuItem value="Newest">Newest</MenuItem>
          <MenuItem value="Oldest">Oldest</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.length === ordersData.length}
                  indeterminate={selected.length > 0 && selected.length < ordersData.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all orders' }}
                />
              </TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Payment status</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => {
              const isItemSelected = selected.indexOf(row.id) !== -1;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={() => handleClick(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        bgcolor: paymentStatusColors[row.paymentStatus] || 'grey.400',
                        px: 1.5,
                        py: 0.4,
                        borderRadius: 1,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                      }}
                    >
                      {row.paymentStatus}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        bgcolor: orderStatusColors[row.orderStatus] || 'grey.400',
                        px: 1.5,
                        py: 0.4,
                        borderRadius: 1,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                      }}
                    >
                      {row.orderStatus}
                    </Box>
                  </TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" size="small" sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
      />
    </Box>
  );
}
