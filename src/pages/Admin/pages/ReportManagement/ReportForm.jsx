import { Stack, Box, Typography, Avatar, Grid, Chip, Modal } from '@mui/material'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'
import RootModal from '../../../../components/Modal/RootModal'
import useSnackbar from '../../../../contexts/snackbar.context'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import moment from 'moment'
import Loading from '../../../../common/components/Loading/Loading'
const ReportForm = ({ open, setOpen, id }) => {
  const { t } = useTranslation()
  const [openImg, setOpenImg] = useState(false)
  const [item, setItem] = useState('')
  const [report, setReport] = useState({})
  const { snack, setSnack } = useSnackbar()
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.report.getReportById + `/${id}`)
      .then((res) => {
        if (res && res.status === 200) {
          setReport(res.data.report)
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
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      {report.user ? (
        <RootModal
          variant='Info'
          title={t('detailInfo')}
          open={open}
          handleClose={() => setOpen(false)}
          handleOk={() => setOpen(false)}
          closeOnly={true}
        >
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Avatar src={report.user.photo_url} />
                <Stack direction='column' spacing={1}>
                  <Stack direction='row' spacing={1}>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {report.user.first_name} {report.user.last_name}
                    </Typography>
                    {report.user.isConfirmed && <VerifiedTwoToneIcon sx={{ color: 'midnightblue' }} />}
                  </Stack>
                  {report.user.role === 'ARTIST' ? (
                    <Chip label={t('ARTIST')} color='success' size='small' variant='outlined' />
                  ) : (
                    <Chip label={t('USER')} color='error' size='small' variant='outlined' />
                  )}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2'>{report.user.email}</Typography>
              <Typography variant='body2'>{report.user.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                {t('title')}:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2'>{report.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                {t('description')}:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2'>{report.description}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                {t('time')}:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2'>{moment(report.createdAt).format('DD/MM/YYYY hh:mm:ss A')}</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box
                component='img'
                src={report.photo_url}
                alt='certificate'
                style={{ width: '100%', height: '500px', objectFit: 'contain' }}
                onClick={() => {
                  setItem(report.photo_url)
                  setOpenImg(true)
                }}
              />
            </Grid>
          </Grid>
        </RootModal>
      ) : (
        <Loading />
      )}
      <Modal
        open={openImg}
        onClose={() => {
          setOpenImg(false)
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box component='img' src={item} alt='certificate' style={{ height: '80vh', objectFit: 'cover' }} />
      </Modal>
    </>
  )
}

export default ReportForm
