import React, { useState } from 'react'
import Rootmodal from '../../../../components/Modal/RootModal'
import { Container, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnack from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const ApproveConfirm = ({ open, setOpen, id, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnack()
  const handleDelete = async () => {
    await AxiosInterceptors.post(urlConfig.requests.rejectRequest + `/${id}/accept`)
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
        title='Xác nhận chấp nhận'
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
          Bạn có chắc chắn muốn chấp nhận yêu cầu này?
        </Container>
      </Rootmodal>
    </>
  )
}

export default ApproveConfirm
