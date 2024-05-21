import React from 'react'
import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material'
import RootModal from '../Modal/RootModal'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import { useTranslation } from 'react-i18next'

const Recharge = ({ openRecharge, setOpenRecharge }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [money, setMoney] = React.useState(0)
  const handleRecharge = async () => {
    if (money <= 0) {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    if (money < 50000 || money > 5000000) {
      setSnack({
        ...snack,
        open: true,
        message: t('rechargeAmount'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.post(urlConfig.transaction.recharge, {
      amount: Number(money)
    })
      .then((res) => {
        // open new page to pay
        window.open(res.data.paymentUrl, '_blank')
        setOpenRecharge(false)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('rechargeFailed'),
          type: 'error'
        })
      })
  }
  return (
    <>
      <RootModal
        variant='Create'
        title={t('recharge')}
        open={openRecharge}
        handleClose={() => setOpenRecharge(false)}
        handleOk={() => handleRecharge()}
        closeOnly={false}
      >
        <Box sx={{ my: 3 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor='outlined-adornment-amount'>{t('moneyAmount')}</InputLabel>
            <OutlinedInput
              id='outlined-adornment-amount'
              startAdornment={<InputAdornment position='start'>đ</InputAdornment>}
              label={t('moneyAmount')}
              type='number'
              placeholder='(50.000 - 5.000.000)'
              onChange={(e) => setMoney(e.target.value)}
            />
          </FormControl>
        </Box>
      </RootModal>
    </>
  )
}

export default Recharge
