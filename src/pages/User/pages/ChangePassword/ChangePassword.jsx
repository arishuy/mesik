import React from 'react'
import {
  Box,
  InputAdornment,
  Stack,
  Button,
  Typography,
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SnackBar from '../../../../common/components/SnackBar'
import useSnackbar from '../../../../contexts/snackbar.context'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
const ChangePassword = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = React.useState(false)
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('')
  const { snack, setSnack } = useSnackbar()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const handleReset = () => {
    setOldPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }
  const handleChangePassword = async () => {
    if (confirmNewPassword !== newPassword) {
      setSnack({
        ...snack,
        open: true,
        message: t('confirmPasswordIsNotMatch'),
        type: 'error'
      })
    } else if (newPassword === oldPassword) {
      setSnack({
        ...snack,
        open: true,
        message: t('newPasswordMustBeDiffFromOldPassword'),
        type: 'error'
      })
    } else {
      const res = await AxiosInterceptors.put(urlConfig.user.updatePassword, {
        current_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword
      })
        .then((res) => {
          if (res.status === 200) {
            setSnack({
              ...snack,
              open: true,
              message: t('changePasswordSuccess'),
              type: 'success'
            })
          }
        })
        .catch((err) => {
          setSnack({
            ...snack,
            open: true,
            message: t('changePasswordFail'),
            type: 'error'
          })
        })
    }
  }
  return (
    <div style={{ width: '100%' }}>
      <SnackBar />
      <Helmet>
        <title>{t('changePassword')}</title>
      </Helmet>
      <Card
        sx={
          isMobile
            ? { display: 'flex', flexDirection: 'column', padding: '20px', margin: '20px 20px' }
            : {
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                margin: '20px 100px'
              }
        }
      >
        <Typography variant='h4' component='h4' sx={{ margin: '1rem' }}>
          {t('changePassword')}
        </Typography>
        <FormControl
          variant='outlined'
          sx={
            isMobile
              ? { m: 1, width: '95%' }
              : {
                  m: 1,
                  width: '48%'
                }
          }
        >
          <InputLabel htmlFor='outlined-old-password'>{t('currentPassword')}</InputLabel>
          <OutlinedInput
            id='outlined-old-password'
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </FormControl>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          sx={{
            '& .MuiTextField-root': isMobile
              ? { m: 1, width: '95%' }
              : {
                  m: 1,
                  width: '48%'
                }
          }}
        >
          <FormControl
            variant='outlined'
            sx={
              isMobile
                ? { m: 1, width: '95%' }
                : {
                    m: 1,
                    width: '48%'
                  }
            }
          >
            <InputLabel htmlFor='outlined-new-password'>{t('newPassword')}</InputLabel>
            <OutlinedInput
              id='outlined-new-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
          <FormControl
            variant='outlined'
            sx={
              isMobile
                ? { m: 1, width: '95%' }
                : {
                    m: 1,
                    width: '48%'
                  }
            }
          >
            <InputLabel htmlFor='outlined-confirm-password'>{t('confirmNewPassword')}</InputLabel>
            <OutlinedInput
              id='outlined-confirm-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Typography variant='subtitle1' sx={{ margin: '1rem' }}>
          {t('passwordRequirements')}
        </Typography>
        <Typography variant='subtitle2' gutterBottom sx={{ marginLeft: '1rem' }}>
          - {t('passwordRequirements.1')}
        </Typography>
        <Typography variant='subtitle2' gutterBottom sx={{ marginLeft: '1rem' }}>
          - {t('passwordRequirements.2')}
        </Typography>
        <Typography variant='subtitle2' gutterBottom sx={{ marginLeft: '1rem' }}>
          - {t('passwordRequirements.3')}
        </Typography>
        <Stack
          spacing={1}
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
          sx={
            isMobile
              ? { marginTop: '2rem' }
              : {
                  marginRight: '2rem'
                }
          }
        >
          <Button variant='text' component='label' color='success' onClick={() => handleChangePassword()}>
            {t('saveChanges')}
          </Button>
          <Button variant='text' component='label' color='error' onClick={() => handleReset()}>
            {t('reset')}
          </Button>
        </Stack>
      </Card>
    </div>
  )
}

export default ChangePassword
