import React, { useState } from 'react'
import { TextField, Button, Box, Container, Typography, Paper, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SellerLogin = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email') // 'email' or 'otp'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Handle email submission and OTP send
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate email
    if (!email.trim()) {
      setError('Please enter your email')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)
    try {
      // Call your API to send OTP
      const response = await fetch('/api/seller/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to send OTP')
      }

      setStep('otp')
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate OTP
    if (!otp.trim()) {
      setError('Please enter the OTP')
      return
    }

    if (otp.length < 4 || otp.length > 6) {
      setError('OTP should be 4-6 digits')
      return
    }

    setLoading(true)
    try {
      // Call your API to verify OTP
      const response = await fetch('/api/seller/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      })

      if (!response.ok) {
        throw new Error('Invalid OTP')
      }

      const data = await response.json()
      // Store JWT token if provided
      if (data.token) {
        localStorage.setItem('sellerToken', data.token)
      }

      navigate('/seller/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setError('')
    setLoading(true)
    try {
      const response = await fetch('/api/seller/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to resend OTP')
      }
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: 3, textAlign: 'center', fontWeight: 'bold' }}>
          Seller Login
        </Typography>

        {step === 'email' ? (
          // Email Form
          <form onSubmit={handleSendOtp}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
                error={!!error}
              />

              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={loading}
                sx={{ marginTop: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Send OTP'}
              </Button>

              <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
                Don't have a seller account?{' '}
                <a href="/seller/signup" style={{ color: '#1976d2', cursor: 'pointer' }}>
                  Sign up here
                </a>
              </Typography>
            </Box>
          </form>
        ) : (
          // OTP Verification Form
          <form onSubmit={handleVerifyOtp}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                disabled
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Enter 4-6 digit OTP"
                disabled={loading}
                error={!!error}
                inputProps={{ maxLength: 6 }}
              />

              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={loading}
                sx={{ marginTop: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
              </Button>

              <Button
                fullWidth
                variant="text"
                color="secondary"
                onClick={handleResendOtp}
                disabled={loading}
              >
                Resend OTP
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setStep('email')
                  setOtp('')
                  setError('')
                }}
                disabled={loading}
              >
                Use Different Email
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Container>
  )
}

export default SellerLogin