import { styled } from '@mui/material/styles'
import { Link, Container, Typography, Stack, TextField, Checkbox, FormControlLabel, Card, Button } from '@mui/material'
import useResponsive from '../../hooks/useResponsive'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginPhoto from '../../assets/images/login.jpg'
import axios from 'axios'
import useSnackbar from '../../contexts/snackbar.context'
import urlConfig from '../../config/UrlConfig'
import { setProfileToLS } from '../../utils/auth'
import { useCookies } from 'react-cookie'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}))

const StyledSection = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 800,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}))

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}))

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { t } = useTranslation()
  const session = null
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['user'])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { snack, setSnack } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorInput, setErrorInput] = useState({
    username: false,
    password: false
  })
  const login = async () => {
    if (username === '') {
      setErrorInput({ ...errorInput, username: true })
      return
    }
    if (password === '') {
      setErrorInput({ ...errorInput, password: true })
      return
    }
    setIsSubmitting(true)
    await axios
      .post(urlConfig.authentication.login, {
        username: username,
        password: password
      })
      .then((res) => {
        if (res.status === 200) {
          setProfileToLS(res.data.user)
          setCookie('access_token', res.data.tokens.access_token, { path: '/' })
          setCookie('refresh_token', res.data.tokens.refresh_token, { path: '/' })
          window.location.reload()
        }
      })
      .catch((err) => {
        setSnack({
          open: true,
          type: 'error',
          message: `${err.response.data.message}`
        })
        setIsSubmitting(false)
      })
  }
  const { handleGoogle, loading, error } = useFetch(urlConfig.authentication.google)

  useEffect(() => {
    /* global google */
    // if (window.google) {
    //   google.accounts.id.initialize({
    //     client_id: process.env.REACT_APP_CLIENT_ID,
    //     callback: handleGoogle
    //   })
    //   google.accounts.id.renderButton(document.getElementById('loginDiv'), {
    //     theme: 'filled_black',
    //     text: 'signin_with',
    //     shape: 'pill'
    //   })
    // }
  }, [])
  const mdUp = useResponsive('up', 'md')
  if (session) {
    navigate('/')
  } else
    return (
      <>
        <Helmet>
          <title>{t('signIn')}</title>
        </Helmet>
        <StyledRoot>
          {mdUp && (
            <StyledSection>
              <img src={LoginPhoto} alt='login' />
            </StyledSection>
          )}
          <Container maxWidth='sm'>
            <StyledContent>
              <Typography
                variant='h4'
                gutterBottom
                sx={{
                  textTransform: 'uppercase',
                  mb: 2
                }}
              >
                {t('signIn')}
              </Typography>
              <Stack spacing={3}>
                <TextField
                  name='username'
                  label={t('username')}
                  required
                  onChange={(e) => {
                    if (username !== '' && errorInput.username) setErrorInput({ ...errorInput, username: false })
                    setUsername(e.target.value)
                  }}
                  error={errorInput.username}
                  helperText={errorInput.username ? 'Username is required' : ''}
                />

                <TextField
                  name='password'
                  label={t('password')}
                  type='password'
                  required
                  onChange={(e) => {
                    if (password !== '' && errorInput.password) setErrorInput({ ...errorInput, password: false })
                    setPassword(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      login()
                    }
                  }}
                  error={errorInput.password}
                  helperText={errorInput.password ? 'Password is required' : ''}
                />
              </Stack>

              <Stack direction='row' alignItems='center' justifyContent='flex-end' sx={{ my: 2 }}>
                <Link
                  variant='subtitle2'
                  underline='hover'
                  href='/forgotpassword'
                  sx={{
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {t('forgotPassword')}?
                </Link>
              </Stack>
              <LoadingButton
                fullWidth
                color='secondary'
                size='large'
                type='submit'
                variant='text'
                loading={isSubmitting}
                onClick={login}
                sx={{ mb: 2 }}
              >
                {t('login')}
              </LoadingButton>
              {/* <Stack id='loginDiv' sx={{ mb: 2 }}>
                Login with Google
              </Stack> */}
              <Typography variant='body2' sx={{ mb: 5 }}>
                {t('dontHaveAccount')}{' '}
                <Link
                  variant='subtitle2'
                  href='/register'
                  sx={{
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {t('registerNow')}
                </Link>
              </Typography>
            </StyledContent>
          </Container>
        </StyledRoot>
      </>
    )
}
