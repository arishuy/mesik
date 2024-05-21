import { styled } from '@mui/material/styles'
import { Link, Container, Typography, Stack, TextField, Card } from '@mui/material'
// hooks
import useResponsive from '../../hooks/useResponsive'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Forgot_Photo from '../../assets/images/forgot_password.png'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
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

export default function ForgotPassword() {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const navigate = useNavigate()
  const mdUp = useResponsive('up', 'md')
  const [isSubmit, setIsSubmit] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })
  const handleResetPassword = async () => {
    if (formData.username === '' || formData.email === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    setIsSubmit(true)
    await Axios.post(urlConfig.authentication.resetPassword, {
      username: formData.username,
      email: formData.email
    })
      .then((res) => {
        if (res && res.status === 200) {
          setIsSubmit(false)
          setSnack({
            ...snack,
            open: true,
            message: t('resetPasswordSuccess'),
            type: 'success'
          })
          setTimeout(() => {
            navigate('/login')
          }, 3000)
        }
      })
      .catch((err) => {
        setIsSubmit(false)
        setSnack({
          ...snack,
          open: true,
          message: t('resetPasswordFailed'),
          type: 'error'
        })
      })
  }
  return (
    <>
      <Helmet>
        <title>{t('forgotPassword')}</title>
      </Helmet>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img src={Forgot_Photo} alt='login' />
          </StyledSection>
        )}
        <Container maxWidth='sm'>
          <StyledContent>
            <Typography
              variant='h4'
              gutterBottom
              sx={{
                textTransform: 'uppercase'
              }}
            >
              {t('forgotPassword')}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{t('forgotPasswordReminder')}</Typography>
            <Stack
              spacing={3}
              sx={{
                my: 2
              }}
            >
              <TextField
                name='username'
                label={t('username')}
                required
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value })
                }}
              />
              <TextField
                name='email'
                label='Email'
                required
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                }}
              />
            </Stack>
            <LoadingButton
              fullWidth
              color='secondary'
              size='large'
              type='submit'
              variant='text'
              loading={isSubmit}
              onClick={() => handleResetPassword()}
            >
              {t('sendResetLink')}
            </LoadingButton>
            <Typography variant='body2' sx={{ my: 2 }}>
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
