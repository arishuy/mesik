import React, { useState } from 'react'
import {
  Box,
  Fab,
  Typography,
  Stack,
  TextField,
  Tooltip,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import RootModal from '../Modal/RootModal'
import Recharge from './Recharge'
import HeaderUserbox from './UserBox'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import Snackbar from '../../common/components/SnackBar'
import useSnackbar from '../../contexts/snackbar.context'
// icon
import AddIcon from '@mui/icons-material/Add'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { useTranslation } from 'react-i18next'
import Notification from './Notification'
import Report from './Report'
import useResponsive from '../../hooks/useResponsive'

const Header = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [open, setOpen] = React.useState(false)
  const [openRecharge, setOpenRecharge] = React.useState(false)
  const { snack, setSnack } = useSnackbar()
  const [data, setData] = useState({
    major_id: '',
    title: '',
    descriptions: '',
    address: {
      city: {
        code: '',
        name: ''
      },
      district: {
        code: '',
        name: ''
      },
      ward: {
        name: '',
        code: ''
      }
    },
    price: 0
  })
  const handleOk = async () => {
    if (parseInt(data.price) === 0) {
      setSnack({
        ...snack,
        open: true,
        message: 'Số tiền không được bằng 0!',
        type: 'error'
      })
      return
    }
    if (
      data.title === '' ||
      data.descriptions === '' ||
      data.major_id === '' ||
      data.price === 0 ||
      data.address.city.code === '' ||
      data.address.district.code === '' ||
      data.address.ward.code === ''
    ) {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.post(urlConfig.job_requests.createJobRequests, data)
      .then((res) => {
        if (res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: t('createJobRequestSuccess'),
            type: 'success'
          })
          setOpen(false)
        }
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('createJobRequestFail'),
          type: 'error'
        })
      })
  }

  return (
    <div>
      <Snackbar />
      {open && (
        <RootModal
          variant='Create'
          title={t('createRequest')}
          open={open}
          handleClose={() => setOpen(false)}
          handleOk={() => handleOk()}
          closeOnly={false}
        >
          <Box sx={{ my: 2 }}>
            <TextField
              id='outlined-basic'
              label={t('title')}
              variant='outlined'
              required
              fullWidth
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <TextField
              id='outlined-basic'
              label={t('description')}
              variant='outlined'
              required
              fullWidth
              sx={{
                mt: 2
              }}
              onChange={(e) => setData({ ...data, descriptions: e.target.value })}
            />
            <Stack direction='row' spacing={3} sx={{ mt: 2 }}>
              <TextField
                id='outlined-select-currency'
                select
                label={t('major')}
                required
                defaultValue=''
                sx={{
                  width: '50%'
                }}
                onChange={(e) => setData({ ...data, major_id: e.target.value })}
              ></TextField>
              <FormControl>
                <InputLabel htmlFor='outlined-adornment-amount'>{t('price')}</InputLabel>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  startAdornment={<InputAdornment position='start'>đ</InputAdornment>}
                  label={t('price')}
                  type='number'
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                />
              </FormControl>
            </Stack>
            <Stack direction='row' spacing={3} sx={{ mt: 2 }}>
              <TextField
                id='outlined-select-currency'
                select
                label={t('city')}
                defaultValue={data.address.city.name}
                required
                sx={{
                  width: '33%'
                }}
              ></TextField>
              <TextField
                id='outlined-select-currency'
                select
                label={t('district')}
                defaultValue={data.address.district.name}
                required
                sx={{
                  width: '33%'
                }}
              ></TextField>
              <TextField
                id='outlined-select-currency'
                select
                label={t('ward')}
                defaultValue={data.address.ward.name}
                required
                sx={{
                  width: '33%'
                }}
              ></TextField>
            </Stack>
          </Box>
        </RootModal>
      )}
      {openRecharge && <Recharge openRecharge={openRecharge} setOpenRecharge={setOpenRecharge} />}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '7vh',
          margin: '0px 20px'
        }}
      >
        <Typography
          variant='h4'
          component='h4'
          onClick={() => navigate('/dashboard')}
          sx={{
            cursor: 'pointer'
          }}
        >
          <ConnectWithoutContactIcon />
          {'  '}
          {isMobile ? '' : 'Mesik'}
        </Typography>
        <div>
          <Stack direction='row' spacing={isMobile ? 0 : 2} sx={{ padding: '10px' }}>
            <Box sx={isMobile ? {} : { '& > :not(style)': { m: 1 } }}>
              <Notification />
              {user.role === 'USER' && (
                <>
                  <Tooltip title={t('createRequest')} arrow>
                    <Fab size='small' aria-label='add' onClick={() => setOpen(true)}>
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title={t('recharge')} arrow>
                    <Fab size='small' aria-label='recharge' onClick={() => setOpenRecharge(true)}>
                      <AttachMoneyIcon />
                    </Fab>
                  </Tooltip>
                  <Report />
                </>
              )}
              <HeaderUserbox />
            </Box>
          </Stack>
        </div>
      </Box>
    </div>
  )
}

export default Header
