import React, { useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'
const AddNewPremiumPackage = ({ open, handleClose, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [newPremiumPackage, setNewPremiumPackage] = useState({
    name: '',
    description: '',
    price: 0,
    durationMonths: 0
  })
  const handleAddNew = async () => {
    if (
      newPremiumPackage.name === '' ||
      newPremiumPackage.description === '' ||
      newPremiumPackage.price === 0 ||
      newPremiumPackage.durationMonths === 0
    ) {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.post(urlConfig.premiumPackages.createPremiumPackage, newPremiumPackage)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('addNewMajorSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('addNewMajorFail'),
          type: 'error'
        })
      )
  }
  return (
    <>
      <Snackbar />
      <RootModal
        variant='Create'
        title={t('newPremiumPackage')}
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
            label='Name'
            variant='outlined'
            fullWidth
            onChange={(e) =>
              setNewPremiumPackage({
                ...newPremiumPackage,
                name: e.target.value
              })
            }
          />
          <TextField
            id='outlined-basic'
            label='Description'
            variant='outlined'
            fullWidth
            onChange={(e) =>
              setNewPremiumPackage({
                ...newPremiumPackage,
                description: e.target.value
              })
            }
          />
        </Stack>
        <Stack spacing={2} direction='row' sx={{ width: '100%', my: 2 }}>
          <TextField
            id='outlined-basic'
            label='Price'
            variant='outlined'
            fullWidth
            type='number'
            onChange={(e) =>
              setNewPremiumPackage({
                ...newPremiumPackage,
                price: e.target.value
              })
            }
          />
          <TextField
            id='outlined-basic'
            label='Duration Months'
            variant='outlined'
            fullWidth
            type='number'
            onChange={(e) =>
              setNewPremiumPackage({
                ...newPremiumPackage,
                durationMonths: e.target.value
              })
            }
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default AddNewPremiumPackage
