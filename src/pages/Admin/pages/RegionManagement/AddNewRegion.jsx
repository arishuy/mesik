import React, { useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const AddNewRegion = ({ open, handleClose, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [newRegion, setNewRegion] = useState({
    name: '',
    description: ''
  })
  const handleAddNew = async () => {
    if (newRegion.name === '' || newRegion.description === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.post(urlConfig.regions.createRegion, newRegion)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('addRegionSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('addRegionFail'),
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
              setNewRegion({
                ...newRegion,
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
              setNewRegion({
                ...newRegion,
                description: e.target.value
              })
            }
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default AddNewRegion
