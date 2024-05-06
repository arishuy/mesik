import React, { useState } from 'react'
import Rootmodal from '../../../../components/Modal/RootModal'
import { Container, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnack from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const RejectConfirm = ({ open, setOpen, id, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnack()
  const [reason, setReason] = useState('')
  const handleDelete = async () => {
    await AxiosInterceptors.post(urlConfig.requests.rejectRequest + `/${id}/reject`, {
      reason: reason
    })
      .then((res) => {
        if (res && res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: t('deleteReportSuccess'),
            type: 'success'
          })
          setOpen(false)
          fetchData()
        }
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('deleteFail'),
          type: 'error'
        })
      )
  }
  return (
    <>
      <Rootmodal
        variant='Info'
        title='Xác nhận từ chối'
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={handleDelete}
        closeOnly={false}
      >
        <Container
          maxWidth='sm'
          sx={{
            mt: 3
          }}
        >
          Bạn có chắc chắn muốn từ chối yêu cầu này?
          <TextField fullWidth label='Lý do từ chối' variant='outlined' onChange={(e) => setReason(e.target.value)} />
        </Container>
      </Rootmodal>
    </>
  )
}

export default RejectConfirm
