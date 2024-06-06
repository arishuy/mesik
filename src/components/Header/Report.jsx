import { ListItem, ListItemText, Stack, TextField } from '@mui/material'
import { NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import RootModal from '../Modal/RootModal'
import { useTranslation } from 'react-i18next'
import UploadReport from './UploadReport'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'
const Report = () => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(new FormData())
  const [data, setData] = useState({
    title: '',
    description: '',
    photo: ''
  })
  const handleReport = async () => {
    await AxiosInterceptors.post(
      urlConfig.report.createReport,
      {
        title: data.title,
        description: data.description,
        photo: formData.get('photo')
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then((res) => {
        if (res && res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: t('reportSuccess'),
            type: 'success'
          })
        }
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('reportFailed'),
          type: 'error'
        })
      })
  }
  return (
    <>
      <RootModal
        variant='Create'
        title={t('report')}
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={
          data.title === '' || data.description === '' || data.photo === ''
            ? () => {
                setSnack({
                  ...snack,
                  open: true,
                  message: t('pleaseFillOutAllFields'),
                  type: 'error'
                })
              }
            : () => {
                handleReport()
                setOpen(false)
              }
        }
        closeOnly={false}
      >
        <Stack direction='column' sx={{ my: 2 }} spacing={2}>
          <TextField
            id='outlined-basic'
            label={t('title')}
            variant='outlined'
            fullWidth
            sx={{
              mt: 2
            }}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <TextField
            id='outlined-basic'
            label={t('description')}
            variant='outlined'
            multiline
            rows={3}
            fullWidth
            sx={{
              mt: 2
            }}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </Stack>
        <UploadReport file={data.photo} setFormData={setFormData} information={data} setInformation={setData} />
      </RootModal>
      <ListItem button component={NavLink} onClick={() => setOpen(true)}>
        <ReportTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
        <ListItemText primary={t('report')} />
      </ListItem>
    </>
  )
}

export default Report
