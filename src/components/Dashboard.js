import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Box, 
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ bgcolor: '#1976d2', color: 'white', height: '100%' }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          D'SAPATUAN
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InventoryIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Produk" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddCircleOutlineIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Tambah Produk" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Daftar Pengunjung" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingBagIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Pesanan" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#f0f0f0'
        }}
      >
        {/* Header */}
        <AppBar 
          position="static" 
          sx={{ 
            bgcolor: '#1976d2',
            boxShadow: 'none',
            ml: { sm: `${drawerWidth}px` },
            width: { sm: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              D'SAPATUAN
            </Typography>
            <IconButton color="inherit">
              <HelpOutlineIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Container sx={{ mt: 4, mb: 4, p: 2 }}>
          <Grid container spacing={3}>
            {/* Statistik Card */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-around', alignItems: 'center', bgcolor: '#9e9e9e', color: 'white' }}>
                {/* Pesanan */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ShoppingBagIcon fontSize="large" />
                    <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                      53
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Pesanan
                  </Typography>
                </Box>

                {/* Tambah Produk */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AddCircleOutlineIcon fontSize="large" />
                  </Box>
                  <Typography variant="body2">
                    Tambah Produk
                  </Typography>
                </Box>

                {/* Visitors */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PeopleAltIcon fontSize="large" />
                    <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                      543
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Visitors
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Divider */}
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* Konten Dashboard Kosong */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#9e9e9e' }}>
                {/* Bisa menambahkan konten dashboard lainnya di sini */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;