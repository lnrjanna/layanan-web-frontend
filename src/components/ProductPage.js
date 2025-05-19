import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  IconButton,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  InputAdornment
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Data produk contoh
const productData = [
  {
    id: 1,
    name: 'Puma Speedcat TTF',
    price: 1999000,
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380173/01/sv01/fnd/IND/fmt/png/Speedcat-OG-Sparco-Motorsport-Shoes',
    status: 'Aktif'
  },
  {
    id: 2,
    name: 'Puma Milenio Tech',
    price: 839300,
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/376644/05/sv01/fnd/IND/fmt/png/Milenio-Tech-Unisex-Sneakers',
    status: 'Aktif'
  },
  {
    id: 3,
    name: 'Nike Court Lite 4',
    price: 1149000,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a0a300da-2e16-4483-ba64-9a19a5bd8a62/court-lite-4-hard-court-tennis-shoes-XdGmrL.png',
    status: 'Aktif'
  },
  {
    id: 4,
    name: 'Nike Air Force 1 Low',
    price: 2379000,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png',
    status: 'Aktif'
  },
  {
    id: 5,
    name: 'Converse One Star 95',
    price: 1299000,
    image: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw8fa9af73/images/a_107/170869C_A_107X1.jpg',
    status: 'Aktif'
  },
  {
    id: 6,
    name: 'Adidas Racer TR21',
    price: 660000,
    image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/96a5f085ef524e55a525abad01056711_9366/Racer_TR21_Shoes_White_GX0651_01_standard.jpg',
    status: 'Aktif'
  },
  {
    id: 7,
    name: 'New Balance 574 EV',
    price: 1599000,
    image: 'https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i?$pdpflexf2$&wid=440&hei=440',
    status: 'Aktif'
  },
  {
    id: 8,
    name: 'Reebok Royal Prime 2',
    price: 499000,
    image: 'https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/a94fbe7d26e3404f8e97acdf00d09f5f_9366/Reebok_Royal_Prime_6_Shoes_White_FW8995_01_standard.jpg',
    status: 'Aktif'
  },
  {
    id: 9,
    name: 'Converse Chuck Taylor',
    price: 999000,
    image: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw4a5f6c6f/images/a_107/M9166_A_107X1.jpg',
    status: 'Aktif'
  },
  {
    id: 10,
    name: 'Adidas Trail Running',
    price: 1260000,
    image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0846e90b15144861b33dacf500e3cfd1_9366/Response_Trail_Shoes_Green_FW9411_01_standard.jpg',
    status: 'Aktif'
  }
];

const ProductPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter produk berdasarkan status dan pencarian
  const filteredProducts = productData.filter(product => {
    const matchesStatus = tabValue === 0 ? product.status === 'Aktif' : product.status === 'Deleted';
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Format harga dalam Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
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

      {/* Content */}
      <Container sx={{ mt: 3 }}>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{ 
              '& .MuiTab-root': { fontWeight: 'bold' },
              '& .Mui-selected': { color: '#1976d2' },
              '& .MuiTabs-indicator': { backgroundColor: '#1976d2', height: 3 }
            }}
          >
            <Tab label="ACTIVE" />
            <Tab label="DELETE" />
          </Tabs>
          
          {/* Search Box */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              placeholder="Cari produk"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ mr: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button 
                      variant="contained" 
                      sx={{ 
                        minWidth: 'auto', 
                        p: '5px', 
                        bgcolor: '#f5a623',
                        '&:hover': { bgcolor: '#e69100' }
                      }}
                    >
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Product Grid */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
              <Card sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Status Badge */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    left: 10, 
                    bgcolor: '#4caf50', 
                    color: 'white', 
                    px: 1, 
                    py: 0.5, 
                    borderRadius: 1,
                    fontSize: '0.75rem'
                  }}
                >
                  Aktif
                </Box>
                
                {/* Product Image */}
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'contain', p: 1 }}
                />
                
                {/* Product Info */}
                <CardContent sx={{ flexGrow: 1, pb: 0 }}>
                  <Typography variant="body2" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatPrice(product.price)} IDR
                  </Typography>
                </CardContent>
                
                {/* Action Buttons */}
                <CardActions sx={{ p: 1 }}>
                  <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={<EditIcon />}
                    sx={{ 
                      bgcolor: '#4caf50', 
                      '&:hover': { bgcolor: '#388e3c' },
                      flex: 1,
                      mr: 1
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={<DeleteIcon />}
                    sx={{ 
                      bgcolor: '#f44336', 
                      '&:hover': { bgcolor: '#d32f2f' },
                      flex: 1
                    }}
                  >
                    delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductPage;