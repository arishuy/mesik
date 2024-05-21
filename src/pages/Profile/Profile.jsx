import { Box, Stack, TextField, Typography, Card, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { LoadingButton } from '@mui/lab'
import React, { useState, useEffect } from 'react'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar'
import Loading from '../../common/components/Loading/Loading'
import useSnackbar from '../../contexts/snackbar.context'
import useResponsive from '../../hooks/useResponsive'
import urlConfig from '../../config/UrlConfig'
import dayjs from 'dayjs'

const Profile = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [information, setInformation] = useState({
    first_name: '',
    last_name: '',
    gender: true,
    phone: '',
    DoB: dayjs(),
    photo: ''
  })
  const [formData, setFormData] = useState(new FormData())
  const [isValidated, setIsValidated] = useState(true)
  const { snack, setSnack } = useSnackbar()
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.user.info)
      .then((res) => {
        setInformation(res.data.user)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsValidated(false)
      })
  }
  const updateData = async () => {
    if (
      information.first_name === '' ||
      information.last_name === '' ||
      information.phone === '' ||
      information.DoB === ''
    ) {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    setIsSubmitting(true)
    await AxiosInterceptors.put(
      urlConfig.user.info,
      {
        first_name: information.first_name,
        last_name: information.last_name,
        gender: information.gender,
        phone: information.phone,
        DoB: information.DoB,
        photo: formData.get('photo')
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then((res) => {
        let artist
        let newData
        if (user.role === 'ARTIST') {
          artist = user.artist
          newData = {
            ...res.data.user,
            artist
          }
        } else {
          newData = res.data.user
        }
        setInformation(newData)
        localStorage.setItem('profile', JSON.stringify(newData))
        setSnack({
          open: true,
          message: t('updateProfileSuccess'),
          type: 'success'
        })
        setIsSubmitting(false)
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: t('updateProfileFail'),
          type: 'error'
        })
        setIsSubmitting(false)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    // (!isValidated && (
    //   <div style={{ width: '100%' }}>
    //     <Card
    //       sx={{
    //         display: 'flex',
    //         flexDirection: 'column',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         height: '80vh',
    //         width: '100%',
    //         backgroundColor: '#f5f5f5',
    //         color: 'red'
    //       }}
    //     >
    //       <h1>{t('validateMail')}</h1>
    //     </Card>
    //   </div>
    // )) ||
    isLoading ? (
      <Loading />
    ) : (
      <div style={{ width: '100%', maxHeight: '93vh', overflow: 'auto' }}>
        <Helmet>
          <title>Thông Tin Cá Nhân</title>
        </Helmet>
        <Box
          sx={
            isMobile
              ? { display: 'flex', flexDirection: 'row', margin: '20px 20px', backgroundColor: 'transparent' }
              : {
                  display: 'flex',
                  flexDirection: 'row',
                  margin: '20px 100px',
                  backgroundColor: 'transparent'
                }
          }
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  py: 10,
                  px: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}
              >
                <UploadAvatar
                  file={information.photo_url}
                  setFormData={setFormData}
                  information={information}
                  setInformation={setInformation}
                />
                <Typography
                  variant='caption'
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary'
                  }}
                >
                  Allowed *.jpg, *.png
                  <br /> max size of 3.5MB
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'block', width: '100%' }}>
                  <Typography variant='h4' component='h4' sx={{ margin: '1.5rem' }}>
                    {t('changeProfile')}
                  </Typography>
                  <Box component='form' noValidate autoComplete='off'>
                    <Box
                      sx={{
                        '& .MuiTextField-root': isMobile ? { m: 2, width: '90%' } : { m: 2, width: '45%' }
                      }}
                    >
                      <TextField
                        fullWidth
                        required
                        id='outlined-required'
                        label={t('username')}
                        defaultValue={information.username}
                        disabled
                      />
                      <TextField
                        fullWidth
                        required
                        id='outlined-required'
                        label='Email'
                        defaultValue={information.email}
                        disabled
                      />
                    </Box>

                    <Box
                      sx={{
                        '& .MuiTextField-root': isMobile ? { m: 2, width: '90%' } : { m: 2, width: '45%' }
                      }}
                    >
                      <TextField
                        required
                        id='outlined-required'
                        label={t('firstName')}
                        defaultValue={information.first_name}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            first_name: e.target.value
                          })
                        }}
                      />
                      <TextField
                        required
                        id='outlined-required'
                        label={t('lastName')}
                        defaultValue={information.last_name}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            last_name: e.target.value
                          })
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        '& .MuiTextField-root': isMobile ? { m: 2, width: '90%' } : { m: 2, width: '29%' }
                      }}
                    >
                      <TextField
                        id='outlined-number'
                        label={t('phoneNumber')}
                        type='number'
                        InputLabelProps={{
                          shrink: true
                        }}
                        defaultValue={information.phone}
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            phone: e.target.value
                          })
                        }}
                      />
                      <FormControl sx={isMobile ? { m: 2, width: '90%' } : { m: 2, width: '29%' }}>
                        <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label={t('gender')}
                          defaultValue={information.gender ? 1 : 0}
                          onChange={(e) => {
                            setInformation({
                              ...information,
                              gender: e.target.value === 1 ? true : false
                            })
                          }}
                        >
                          <MenuItem value={0}>{t('male')}</MenuItem>
                          <MenuItem value={1}>{t('female')}</MenuItem>
                        </Select>
                      </FormControl>

                      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '45%', m: 2 }}>
                        <DatePicker
                          label={t('dateOfBirth')}
                          value={dayjs(information.DoB)}
                          onChange={(newValue) =>
                            setInformation({
                              ...information,
                              DoB: newValue
                            })
                          }
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                  <Stack
                    spacing={1}
                    direction='row'
                    alignItems='center'
                    justifyContent={isMobile ? 'center' : 'flex-end'}
                    sx={{
                      mt: 3,
                      marginRight: isMobile ? '0px' : '2rem'
                    }}
                  >
                    <LoadingButton
                      fullWidth
                      color='success'
                      variant='text'
                      loading={isSubmitting}
                      onClick={updateData}
                      sx={{
                        width: '150px'
                      }}
                    >
                      {t('saveChanges')}
                    </LoadingButton>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    )
  )
}

export default Profile
