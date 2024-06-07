import React, { useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
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
          message: t('addNewPackageSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('addNewPackageFail'),
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
              setNewPremiumPackage({
                ...newPremiumPackage,
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
            label={t('price')}
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
            label={t('Duration Months')}
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
