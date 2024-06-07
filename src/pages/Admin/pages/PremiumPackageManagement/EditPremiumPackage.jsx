import React, { useEffect, useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const EditPremiumPackage = ({ open, handleClose, id, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [premiumPackage, setPremiumPackage] = useState({})
  const handleEdit = async () => {
    if (
      premiumPackage.name === '' ||
      premiumPackage.description === '' ||
      premiumPackage.price === 0 ||
      premiumPackage.durationMonths === 0
    ) {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.put(urlConfig.premiumPackages.updatePremiumPackage + `/${id}`, premiumPackage)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('updateSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('updateFail'),
          type: 'error'
        })
      )
  }

  const fetchPremiumPackage = async () => {
    await AxiosInterceptors.get(urlConfig.premiumPackages.getPremiumPackageById + `/${id}`)
      .then((res) => {
        setPremiumPackage(res.data.premiumPackage)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('getPremiumPackageFail'),
          type: 'error'
        })
      })
  }
  useEffect(() => {
    fetchPremiumPackage()
  }, [id])
  return (
    <>
      {premiumPackage && premiumPackage.name && (
        <RootModal
          variant='Create'
          title={t('premiumPackage')}
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
              label={t('name')}
              variant='outlined'
              fullWidth
              value={premiumPackage.name}
              onChange={(e) =>
                setPremiumPackage({
                  ...premiumPackage,
                  name: e.target.value
                })
              }
            />
            <TextField
              id='outlined-basic'
              label={t('description')}
              variant='outlined'
              fullWidth
              value={premiumPackage.description}
              onChange={(e) =>
                setPremiumPackage({
                  ...premiumPackage,
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
              value={premiumPackage.price}
              onChange={(e) =>
                setPremiumPackage({
                  ...premiumPackage,
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
              value={premiumPackage.durationMonths}
              onChange={(e) =>
                setPremiumPackage({
                  ...premiumPackage,
                  durationMonths: e.target.value
                })
              }
            />
          </Stack>
        </RootModal>
      )}
    </>
  )
}

export default EditPremiumPackage
