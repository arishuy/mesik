import React, { useEffect, useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const EditSection = ({ open, handleClose, section_data, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [section, setSection] = useState(section_data)
  const handleEdit = async () => {
    if (section.name === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.put(urlConfig.sections.updateSection + `/${section._id}`, section)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('updateSectionSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('updateSectionFail'),
          type: 'error'
        })
      )
  }

  return (
    <>
      {section && section.name && (
        <RootModal
          variant='Create'
          title='Edit Section'
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
              label='Name'
              variant='outlined'
              fullWidth
              value={section.name}
              onChange={(e) =>
                setSection({
                  ...section,
                  name: e.target.value
                })
              }
            />
          </Stack>
        </RootModal>
      )}
    </>
  )
}

export default EditSection
