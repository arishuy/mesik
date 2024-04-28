import React, { useState } from 'react'
import { Card, Stack, Typography, FormControlLabel, Checkbox, Button, Box, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import RootModal from '../../../../components/Modal/RootModal'
import { useCookies } from 'react-cookie'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'

const BecomeArtist = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [descriptions, setDecriptions] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [check, setCheck] = useState(false)
  const { snack, setSnack } = useSnackbar()
  const logOut = async () => {
    removeCookie('access_token', { path: '/' })
    removeCookie('refresh_token', { path: '/' })
    removeCookie('user', { path: '/' })
    localStorage.removeItem('profile')
    window.location.href = '/promote-to-artist'
  }
  const handlePromote = async () => {
    await AxiosInterceptors.post(urlConfig.user.promoteToArtist, {
      descriptions: descriptions
    })
      .then((res) => {
        setOpen(false)
        setSnack({
          ...snack,
          open: true,
          message: t('promoteToExpertSuccess'),
          type: 'success'
        })
        logOut()
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('promoteToExpertFail'),
          type: 'error'
        })
      })
  }
  const handleOpen = () => {
    if (check === false) {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseAgreeToTheTermAndCondition'),
        type: 'error'
      })
      return
    }

    setOpen(true)
  }
  return (
    <>
      <Snackbar />
      <RootModal
        variant='Create'
        title={t('promoteTitle')}
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => handlePromote()}
        closeOnly={false}
      >
        <Box sx={{ my: 3 }}>
          <TextField
            fullWidth
            label={t('description')}
            multiline
            rows={4}
            onChange={(e) => setDecriptions(e.target.value)}
          />
        </Box>
      </RootModal>
      <Box
        sx={{
          padding: '20px',
          margin: '20px 100px',
          width: '100%'
        }}
      >
        <Typography variant='h3' component='h3' sx={{ margin: '1rem' }}>
          Trở thành nghệ sĩ
        </Typography>
        <Typography variant='body1' sx={{ margin: '1rem' }}>
          Quyền lợi khi trở thành nghệ sĩ:
        </Typography>
        <Typography variant='body1' sx={{ ml: '3rem' }}>
          1. Được tải lên bài hát của bạn
        </Typography>
        <Typography variant='body1' sx={{ ml: '3rem' }}>
          2. Được tạo album cá nhân
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={check} onChange={(e) => setCheck(e.target.checked)} />}
          label='Tôi đồng ý với các điều khoản và điều kiện của trang web'
          sx={{ marginLeft: '1.5rem' }}
        />
        <Stack
          spacing={1}
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
          sx={{
            marginRight: '2rem'
          }}
        >
          <Button variant='text' component='label' color='primary' onClick={handleOpen}>
            {t('promote')}
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default BecomeArtist
