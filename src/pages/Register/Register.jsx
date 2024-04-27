// @mui
import { styled } from '@mui/material/styles'
import { Link, Container, Typography, Stack, TextField, Card } from '@mui/material'
// hooks
import useResponsive from '../../hooks/useResponsive'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Snackbar from '../../common/components/SnackBar'
import useSnackbar from '../../contexts/snackbar.context'
import image from '../../assets/images/login.jpg'
import axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'

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

export default function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { snack, setSnack } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const mdUp = useResponsive('up', 'md')
  const register = async () => {
    if (password !== confirmPassword) {
      setSnack({
        open: true,
        message: t('passwordsNotMatch'),
        type: 'error'
      })
      return
    }
    setIsSubmitting(true)
    await axios
      .post(urlConfig.authentication.register, {
        first_name: firstname,
        last_name: lastname,
        email: email,
        username: username,
        password: password
      })
      .then((res) => {
        navigate('/login')
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: err.response.data.message,
          type: 'error'
        })
        setIsSubmitting(false)
      })
  }
  return (
    <>
      <Helmet>
        <title>{t('register')}</title>
      </Helmet>
      <Snackbar />
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img src={image} alt='register' />
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
              {t('signUp')}
            </Typography>
            <Stack spacing={3}>
              <TextField
                name='username'
                label={t('username')}
                required
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
              <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
                <TextField
                  name='name'
                  label={t('firstName')}
                  required
                  onChange={(e) => {
                    setFirstname(e.target.value)
                  }}
                />
                <TextField
                  name='surname'
                  label={t('lastName')}
                  required
                  onChange={(e) => {
                    setLastname(e.target.value)
                  }}
                />
              </Stack>
              <TextField
                name='email'
                label='Email'
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <TextField
                name='password'
                label={t('password')}
                type='password'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <TextField
                name='passwordconfirm'
                label={t('passwordConfirm')}
                type='password'
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </Stack>
            <LoadingButton
              fullWidth
              color='secondary'
              size='large'
              type='submit'
              variant='text'
              loading={isSubmitting}
              onClick={register}
              sx={{ my: 2 }}
            >
              {t('register')}
            </LoadingButton>
            <Typography variant='body2' sx={{ mb: 5 }}>
              {t('alreadyMember')}{' '}
              <Link
                variant='subtitle2'
                href='/login'
                sx={{
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {t('signIn')}
              </Link>
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  )
}
