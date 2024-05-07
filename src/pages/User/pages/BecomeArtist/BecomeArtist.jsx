import React, { useEffect, useState } from 'react'
import { Stack, Typography, FormControlLabel, Checkbox, Button, Box, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import RootModal from '../../../../components/Modal/RootModal'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'
import Loading from '../../../../common/components/Loading/Loading'
import moment from 'moment'

const BecomeArtist = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [descriptions, setDecriptions] = useState('')
  const [check, setCheck] = useState(false)
  const { snack, setSnack } = useSnackbar()
  const [request, setRequest] = useState({})
  const [isLoading, setIsLoading] = React.useState(true)

  const handlePromote = async () => {
    await AxiosInterceptors.post(urlConfig.user.promoteToArtist, {
      descriptions: descriptions,
      display_name: displayName
    })
      .then((res) => {
        setOpen(false)
        getMyRequest()
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

  const getMyRequest = async () => {
    await AxiosInterceptors.get(urlConfig.user.getMyRequest)
      .then((res) => {
        setRequest(res.data.request[0])
        setIsLoading(false)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('error'),
          type: 'error'
        })
      })
  }
  useEffect(() => {
    getMyRequest()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div style={{ width: '75%' }}>
      {request && request.status === 'PENDING' && (
        <Box
          sx={{
            padding: '20px',
            margin: '20px 100px'
          }}
        >
          <Typography variant='h3' component='h3' sx={{ margin: '1rem' }}>
            Yêu cầu của bạn đã được gửi
          </Typography>
          <Stack spacing={1} direction='column' ml={3}>
            <Typography variant='body1' sx={{ margin: '1rem' }} fontWeight='bold'>
              - Ngày gửi: {moment(request.updatedAt).format('h:mm:ss A')}
              {' - '}
              {moment(request.updatedAt).format('DD/MM/YYYY')}{' '}
            </Typography>
            <Typography variant='body1' sx={{ margin: '1rem' }} fontWeight='bold'>
              - Trạng thái: Đang chờ xử lý
            </Typography>
          </Stack>
        </Box>
      )}
      {request && request.status === 'REJECTED' && (
        <Box
          sx={{
            padding: '20px',
            margin: '20px 100px',
            width: '100%'
          }}
        >
          <Typography variant='h3' component='h3' sx={{ margin: '1rem' }}>
            Yêu cầu của bạn đã bị từ chối
          </Typography>
          <Stack spacing={1} direction='column' ml={3}>
            <Typography variant='body1' sx={{ margin: '1rem' }} fontWeight='bold'>
              - Lý do: {request.reason}
            </Typography>
            <Typography variant='body1' sx={{ margin: '1rem' }} fontWeight='bold'>
              - Ngày từ chối: {moment(request.updatedAt).format('h:mm:ss A')}
              {' - '}
              {moment(request.updatedAt).format('DD/MM/YYYY')}{' '}
            </Typography>
          </Stack>
        </Box>
      )}
      {request && request.status === 'APPROVED' && ''}
      {!request && (
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
              <TextField fullWidth label={t('displayName')} onChange={(e) => setDisplayName(e.target.value)} />
              <TextField
                fullWidth
                label={t('description')}
                multiline
                rows={4}
                sx={{ mt: 3 }}
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
      )}
    </div>
  )
}

export default BecomeArtist
