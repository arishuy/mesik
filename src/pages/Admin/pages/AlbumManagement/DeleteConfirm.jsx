import React from 'react'
import Rootmodal from '../../../../components/Modal/RootModal'
import { Container } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnack from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const DeleteConfirm = ({ open, setOpen, id, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnack()
  const handleDelete = async () => {
    await AxiosInterceptors.delete(urlConfig.albums.deleteAlbum + `/${id}`)
      .then((res) => {
        if (res && res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: t('deleteSuccess'),
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
          Bạn có chắc chắn muốn xóa album này?
        </Container>
      </Rootmodal>
    </>
  )
}

export default DeleteConfirm
