import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Box, 
  IconButton,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            D'SAPATUAN
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {/* Statistik Card */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              {/* Total Product */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StorefrontIcon fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    30
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total Product
                </Typography>
              </Box>

              {/* Pesanan */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ShoppingBagIcon fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    3
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Pesanan
                </Typography>
              </Box>

              {/* Tambah Produk */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AddCircleOutlineIcon fontSize="large" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Tambah Produk
                </Typography>
              </Box>

              {/* Visitors */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PeopleAltIcon fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    5
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Visitors
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Konten Dashboard Kosong */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Bisa menambahkan konten dashboard lainnya di sini */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;