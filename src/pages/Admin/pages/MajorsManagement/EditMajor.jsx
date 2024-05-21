import React, { useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const EditMajor = ({ open, handleClose, fetchData, item }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [major, setMajor] = useState({
    name: item.name,
    descriptions: item.descriptions
  })
  const handleEdit = async () => {
    await AxiosInterceptors.put(urlConfig.majors.updateMajors + `/${item._id}`, major)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('editMajorSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('editMajorFail'),
          type: 'error'
        })
      )
  }
  return (
    <>
      <RootModal
        variant='Edit'
        title={t('editMajor')}
        open={open}
        handleClose={handleClose}
        handleOk={() => {
          handleEdit()
          handleClose()
        }}
        closeOnly={false}
      >
        <Stack spacing={2} direction='row' sx={{ width: '100%', my: 2 }}>
          <TextField
            id='outlined-basic'
            label={t('majorName')}
            variant='outlined'
            fullWidth
            defaultValue={item.name}
            onChange={(e) =>
              setMajor({
                ...major,
                name: e.target.value
              })
            }
          />
          <TextField
            id='outlined-basic'
            label={t('description')}
            variant='outlined'
            fullWidth
            defaultValue={item.descriptions}
            onChange={(e) =>
              setMajor({
                ...major,
                descriptions: e.target.value
              })
            }
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default EditMajor
