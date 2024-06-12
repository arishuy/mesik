import { Card, Grid, Typography, useTheme, Stack, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
import { Helmet } from 'react-helmet-async'
import { LoadingButton } from '@mui/lab'
import Loading from '../../common/components/Loading/Loading'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import useResponsive from '../../hooks/useResponsive'
import { useTranslation } from 'react-i18next'

const BuyPremium = () => {
  const { t } = useTranslation()
  const isMobile = useResponsive('down', 'sm')
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
  const handleBuyPremiumPackages = async (premiumPackage) => {
    setIsSubmitting(true)
    await AxiosInterceptors.post(urlConfig.transaction.recharge, {
      amount: Number(premiumPackage.price)
    })
      .then((res) => {
        // open new page to pay
        window.open(res.data.paymentUrl, '_blank')
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: err.response.data.message,
          type: 'error'
        })
      })
    setIsSubmitting(false)
  }
  useEffect(() => {
    checkPermission()
    fetchData()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <div style={isMobile ? { width: '100%', padding: '20px 20px' } : { width: '100%', padding: '20px 100px' }}>
      <Helmet>
        <title>{t('premiumPackage')}</title>
      </Helmet>
      <Stack spacing={2} direction='row' sx={{ justifyContent: 'space-between' }}>
        <div>
          <Typography variant='h3' pt={3}>
            {t('buyPremium')}
          </Typography>
          <Typography variant='h6' gutterBottom pb={3}>
            {t('premiumPackageDescription')}
          </Typography>
        </div>
        <div
          style={{
            textAlign: 'right'
          }}
        >
          <Typography variant='h4' pt={3}>
            {t('myPackage')}:{' '}
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
            {t('expirationDate')}:{' '}
            {user.premiumEndDate ? dayjs(user.premiumEndDate).format('DD/MM/YYYY') : t('notBuyPackage')}
          </Typography>
        </div>
      </Stack>
      <Grid container spacing={3}>
        {premiumPackages.map((premiumPackage) => (
          <Grid item xs={12} sm={12} md={6} key={premiumPackage._id}>
            <Card
              sx={{
                p: 5,
                background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
                color: theme.palette.primary.contrastText
              }}
            >
              <Typography variant='h2' gutterBottom>
                {premiumPackage.name}
              </Typography>
              <Typography variant='h5' gutterBottom ml={1}>
                {t('unlimitedListening')}
              </Typography>
              <Typography variant='h5' gutterBottom ml={1}>
                {t('noAds')}
              </Typography>
              <Typography variant='h5' gutterBottom ml={1}>
                {t('canDownload')}
              </Typography>
              <Typography variant='h3'>
                {t('justOnly')} {convertNumber(premiumPackage.price)} VNĐ/{premiumPackage.durationMonths} {t('month')}
              </Typography>
              <LoadingButton
                variant='contained'
                color='primary'
                onClick={() => handleBuyPremiumPackages(premiumPackage)}
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
