import { Card, Grid, Typography, Button, useTheme, Stack, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
import { Helmet } from 'react-helmet-async'
import { LoadingButton } from '@mui/lab'
import Loading from '../../common/components/Loading/Loading'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

const BuyPremium = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const user = JSON.parse(localStorage.getItem('profile'))
  const { snack, setSnack } = useSnackbar()
  const [premiumPackages, setPremiumPackages] = React.useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkPermission = () => {
    if (!user) {
      navigate('/login')
    }
  }

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.premiumPackages.getAllPremiumPackages)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.premiumPackages) {
            // revert array
            setPremiumPackages(res.data.pagination.premiumPackages.reverse())
            setIsLoading(false)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  // fuction convert 2000000 to 2,000,000
  const convertNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
  const handleBuyPremiumPackages = async (id) => {
    setIsSubmitting(true)
    await AxiosInterceptors.post(urlConfig.user.buyPremium + `/${id}`)
      .then((res) => {
        if (res && res.status === 200) {
          const newData = { ...user, premiumEndDate: res.data.result.premiumEndDate, balance: res.data.result.balance }
          localStorage.setItem('profile', JSON.stringify(newData))
          setSnack({
            open: true,
            message: 'Mua gói Premium thành công',
            type: 'success'
          })
          setIsSubmitting(false)
        }
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
  useEffect(() => {
    checkPermission()
    fetchData()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      <Helmet>
        <title>Gói Premium</title>
      </Helmet>
      <Stack spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
        <div>
          <Typography variant='h3' pt={3}>
            Mua gói Premium
          </Typography>
          <Typography variant='h6' gutterBottom pb={3}>
            Nâng cấp tài khoản để trải nghiệm các tính năng và nội dung cao cấp
          </Typography>
        </div>
        <div
          style={{
            textAlign: 'right'
          }}
        >
          <Typography variant='h4' pt={3}>
            Gói của bạn:{' '}
            <Chip
              label={user.premiumEndDate && dayjs(user.premiumEndDate) > dayjs() ? 'PREMIUM' : 'FREE'}
              color={user.premiumEndDate && dayjs(user.premiumEndDate) > dayjs() ? 'secondary' : 'error'}
              sx={{
                fontWeight: 'bold',
                px: 1,
                ml: 1
              }}
            />
          </Typography>
          <Typography variant='h6' gutterBottom pb={3}>
            Ngày hết hạn: {user.premiumEndDate ? dayjs(user.premiumEndDate).format('DD/MM/YYYY') : 'Chưa mua gói'}
          </Typography>
        </div>
      </Stack>
      <Grid container spacing={3}>
        {premiumPackages.map((premiumPackage) => (
          <Grid item xs={12} sm={12} md={6} key={premiumPackage._id}>
            <Card
              sx={{
                p: 5,
                background: 'rgb(2,0,36)',
                background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
                color: theme.palette.primary.contrastText
              }}
            >
              <Typography variant='h2' gutterBottom>
                {premiumPackage.name}
              </Typography>
              <Typography variant='h5' gutterBottom>
                Thoải mái nghe nhạc không giới hạn
              </Typography>
              <Typography variant='h3'>
                Chỉ với {convertNumber(premiumPackage.price)} VNĐ/{premiumPackage.durationMonths} tháng
              </Typography>
              <LoadingButton
                variant='contained'
                color='primary'
                onClick={() => handleBuyPremiumPackages(premiumPackage._id)}
                fullWidth
                loading={isSubmitting}
                sx={{
                  borderRadius: '20px',
                  my: 2
                }}
              >
                Mua ngay
              </LoadingButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default BuyPremium
