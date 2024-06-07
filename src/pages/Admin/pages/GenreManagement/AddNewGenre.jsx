import React, { useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const AddNewGenre = ({ open, handleClose, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [newGenre, setNewGenre] = useState({
    name: '',
    description: ''
  })
  const handleAddNew = async () => {
    if (newGenre.name === '' || newGenre.description === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.post(urlConfig.genres.createGenre, newGenre)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('addNewGenreSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('addNewGenreFail'),
          type: 'error'
        })
      )
  }
  return (
    <>
      <RootModal
        variant='Create'
        title={t('addNew')}
        open={open}
        handleClose={handleClose}
        handleOk={() => {
          handleAddNew()
          handleClose()
        }}
        closeOnly={false}
      >
        <Stack spacing={2} direction='row' sx={{ width: '100%', my: 2 }}>
          <TextField
            id='outlined-basic'
            label={t('name')}
            variant='outlined'
            fullWidth
            onChange={(e) =>
              setNewGenre({
                ...newGenre,
                name: e.target.value
              })
            }
          />
          <TextField
            id='outlined-basic'
            label={t('description')}
            variant='outlined'
            fullWidth
            onChange={(e) =>
              setNewGenre({
                ...newGenre,
                description: e.target.value
              })
            }
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default AddNewGenre
