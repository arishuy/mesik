import React, { useEffect, useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const EditRegion = ({ open, handleClose, id, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [region, setRegion] = useState({})
  const handleEdit = async () => {
    if (region.title === '' || region.description === '' || region.photo === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.put(urlConfig.regions.updateRegion + `/${id}`, region)
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

  const fetchRegion = async () => {
    await AxiosInterceptors.get(urlConfig.regions.getRegionById + `/${id}`)
      .then((res) => {
        setRegion(res.data.region)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('getRegionFail'),
          type: 'error'
        })
      })
  }
  useEffect(() => {
    fetchRegion()
  }, [id])
  return (
    <>
      {region && region.name && (
        <RootModal
          variant='Create'
          title={t('region')}
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
              value={region.name}
              onChange={(e) =>
                setRegion({
                  ...region,
                  name: e.target.value
                })
              }
            />
            <TextField
              id='outlined-basic'
              label={t('description')}
              variant='outlined'
              fullWidth
              value={region.description}
              onChange={(e) =>
                setRegion({
                  ...region,
                  description: e.target.value
                })
              }
            />
          </Stack>
        </RootModal>
      )}
    </>
  )
}

export default EditRegion
