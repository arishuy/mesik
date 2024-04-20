import React, { useState } from 'react'
import Rootmodal from '../../../../components/Modal/RootModal'
import { Container } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnack from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'
import Loading from '../../../../common/components/Loading/Loading'

const PaymentConfirm = ({ id, open, setOpen, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnack()
  const [isLoading, setIsLoading] = useState(false)
  const handlePayment = async (id) => {
    setIsLoading(true)
    await AxiosInterceptors.post(urlConfig.job_requests.doneJobRequests + `/${id}/complete-and-payment`)
      .then((res) => {
        if (res && res.status === 200) {
          setIsLoading(false)
          setSnack({
            ...snack,
            open: true,
            message: t('paymentSuccess'),
            type: 'success'
          })
          setOpen(false)
          fetchData()
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setSnack({
          ...snack,
          open: true,
          message: t('paymentFail'),
          type: 'error'
        })
      })
  }
  return (
    <>
      {isLoading && <Loading />}
      <Snackbar />
      <Rootmodal
        variant='Info'
        title={t('paymentConfirm')}
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => handlePayment(id)}
        closeOnly={false}
      >
        <Container
          maxWidth='sm'
          sx={{
            mt: 3
          }}
        ></Container>
      </Rootmodal>
    </>
  )
}

export default PaymentConfirm
