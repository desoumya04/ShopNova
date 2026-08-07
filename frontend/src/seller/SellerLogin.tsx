import React, { useState } from 'react'
import { TextField, Button, Box, Container, Typography, Paper, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../Redux_toolkit/store';
import { loginSeller } from '../Redux_toolkit/seller/seller';

const SellerLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const seller = useAppSelector((state) => state.seller);

  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setValidationError('Please enter your email');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setValidationError('Please enter a valid email');
      return;
    }

    setValidationError('');

    const resultAction = await dispatch(loginSeller(trimmedEmail));

    if (loginSeller.fulfilled.match(resultAction)) {
      const jwt = (resultAction.payload as { jwt?: string } | undefined)?.jwt;

      if (jwt) {
        localStorage.setItem('jwt', jwt);
      }

      navigate('/seller');
    }
  };


  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: 3, textAlign: 'center', fontWeight: 'bold' }}>
          Seller Login
        </Typography>

        <form onSubmit={handleLogin}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={seller.loading}
              error={Boolean(validationError || seller.error)}
            />

            {validationError ? (
              <Typography color="error" variant="body2">
                {validationError}
              </Typography>
            ) : seller.error ? (
              <Typography color="error" variant="body2">
                {seller.error}
              </Typography>
            ) : null}

            <Button 
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={seller.loading}
              sx={{ marginTop: 2 }}
            >
              {seller.loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
              Don't have a seller account?{' '}
              <a href="/seller/signup" style={{ color: '#1976d2', cursor: 'pointer' }}>
                Sign up here
              </a>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default SellerLogin