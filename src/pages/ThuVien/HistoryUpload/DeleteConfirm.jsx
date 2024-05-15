import React from 'react'
import Rootmodal from '../../../components/Modal/RootModal'
import { Container } from '@mui/material'
import AxiosInterceptors from '../../../common/utils/axiosInterceptors'
import urlConfig from '../../../config/UrlConfig'

import { useTranslation } from 'react-i18next'
const DeleteConfirm = ({ open, setOpen, id, fetchData, snack, setSnack }) => {
  const { t } = useTranslation()
  const handleDelete = async () => {
    await AxiosInterceptors.delete(urlConfig.music.deleteMusicByArtist + `/${id}`)
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
        title='Xác nhận xóa'
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
          Bạn có chắc chắn muốn xóa bài hát này?
        </Container>
      </Rootmodal>
    </>
  )
}

export default DeleteConfirm
