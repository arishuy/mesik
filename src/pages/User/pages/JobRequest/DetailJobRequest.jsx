import React, { useState } from 'react'
import Rootmodal from '../../../../components/Modal/RootModal'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useEffect } from 'react'
import { Container, Typography, Rating } from '@mui/material'
import moment from 'moment'
import Loading from '../../../../common/components/Loading/Loading'
import { useTranslation } from 'react-i18next'

const DetailJobRequest = ({ open, setOpen, id }) => {
  const { t } = useTranslation()
  const [data, setData] = useState({})
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.job_requests.getJobRequests + `/${id}`)
      .then((res) => {
        if (res && res.status === 200) {
          setData(res.data.job_request)
        }
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchData()
  }, [id])
  return (
    <>
      {data.expert ? (
        <Rootmodal
          variant='Info'
          title={t('detailJobRequest')}
          open={open}
          handleClose={() => setOpen(false)}
          handleOk={() => setOpen()}
          closeOnly={true}
        >
          <Container
            maxWidth='sm'
            sx={{
              mt: 3
            }}
          >
            <Typography variant='h6' gutterBottom component='div'>
              {t('title')}:
              <Typography
                variant='h6'
                gutterBottom
                component='span'
                sx={{
                  fontWeight: 'normal',
                  ml: 1
                }}
              >
                {data.title}
              </Typography>
            </Typography>
            <Typography variant='h6' gutterBottom component='div'>
              {t('description')}:
              <Typography
                variant='h6'
                gutterBottom
                component='span'
                sx={{
                  fontWeight: 'normal',
                  ml: 1
                }}
              >
                {data.descriptions}
              </Typography>
            </Typography>
            <Typography variant='h6' gutterBottom component='div'>
              {t('price')}:{' '}
              <Typography
                variant='h6'
                gutterBottom
                component='span'
                sx={{
                  fontWeight: 'normal',
                  ml: 1
                }}
              >
                {data.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
              </Typography>
            </Typography>
            <Typography variant='h6' gutterBottom component='div'>
              {t('expertAccept')}:{' '}
              <Typography
                variant='h6'
                gutterBottom
                component='span'
                sx={{
                  fontWeight: 'normal',
                  ml: 1
                }}
              >
                {data.expert.user.first_name} {data.expert.user.last_name}
              </Typography>
            </Typography>
            <Typography variant='h6' gutterBottom component='div'>
              {t('rating')}: <Rating name='simple-controlled' value={data.expert.average_rating} readOnly />
            </Typography>
            <Typography variant='h6' gutterBottom component='div'>
              {t('phoneNumber')}:{' '}
              <Typography
                variant='h6'
                gutterBottom
                component='span'
                sx={{
                  fontWeight: 'normal',
                  ml: 1
                }}
              >
                {data.expert.user.phone}
              </Typography>
            </Typography>
            <Typography variant='h6' gutterBottom component='div'>
              Email:
              <Typography
                variant='h6'
                gutterBottom
                component='span'
                sx={{
                  fontWeight: 'normal',
                  ml: 1
                }}
              >
                {data.expert.user.email}
              </Typography>
            </Typography>
            <Typography variant='h6' gutterBottom component='div'>
              {t('timeBooking')}:{' '}
              <Typography
                variant='h6'
                gutterBottom
                component='span'
                sx={{
                  fontWeight: 'normal',
                  ml: 1
                }}
              >
                {moment(Date.parse(data.time_booking)).format('DD/MM/YYYY, h:mm:ss a')}
              </Typography>
            </Typography>
          </Container>
        </Rootmodal>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default DetailJobRequest
