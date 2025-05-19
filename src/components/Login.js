import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Tambahkan logika autentikasi di sini
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 2,
          width: '100%',
          backgroundColor: '#5DADE2'
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
          D'SAPATUAN
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            placeholder="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            variant="standard"
            InputProps={{
              style: { color: 'white' },
            }}
            sx={{ 
              mb: 2,
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:after': { borderBottomColor: 'white' },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            variant="standard"
            InputProps={{
              style: { color: 'white' },
            }}
            sx={{ 
              mb: 2,
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:after': { borderBottomColor: 'white' },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  sx={{ 
                    color: 'white',
                    '&.Mui-checked': {
                      color: 'white',
                    },
                  }}
                />
              }
              label="Remember me"
              sx={{ color: 'white' }}
            />
            <Link href="#" variant="body2" sx={{ color: 'white', fontSize: '0.8rem' }}>
              forgot password?
            </Link>
          </Box>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 2, 
              mb: 3, 
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              backgroundColor: '#0C4B77',
              '&:hover': {
                backgroundColor: '#083759',
              }
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;