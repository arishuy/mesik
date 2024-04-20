import React, { useEffect, useState, useContext } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Box, TextField, Stack, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import Axios from 'axios'
import { useTranslation } from 'react-i18next'
import { MajorContext } from '../../../../contexts/major.context'
import Loading from '../../../../common/components/Loading/Loading'
import useSnack from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'

const EditJobRequest = ({ open, setOpen, item, fetchData }) => {
  const { t } = useTranslation()
  const [tinh, setTinh] = useState([])
  const [huyen, setHuyen] = useState([])
  const [xa, setXa] = useState([])
  const { majors, loading, getMajors } = useContext(MajorContext)
  const { snack, setSnack } = useSnack()
  const [data, setData] = useState({
    major_id: item.major._id,
    title: item.title,
    descriptions: item.descriptions,
    address: {
      city: {
        code: item.address.city.code,
        name: item.address.city.name
      },
      district: {
        code: item.address.district.code,
        name: item.address.district.name
      },
      ward: {
        code: item.address.ward.code,
        name: item.address.ward.name
      }
    },
    price: item.price
  })
  const fetchTinh = async () => {
    await Axios.get('https://provinces.open-api.vn/api/p/')
      .then((res) => {
        setTinh(res.data)
      })
      .catch((err) => console.log(err))
  }
  const fetchHuyen = async () => {
    await Axios.get(`https://provinces.open-api.vn/api/p/${data.address?.city.code}?depth=2`)
      .then((res) => {
        setHuyen(res.data.districts)
      })
      .catch((err) => console.log(err))
  }
  const fetchXa = async () => {
    await Axios.get(`https://provinces.open-api.vn/api/d/${data.address?.district.code}?depth=2`)
      .then((res) => {
        setXa(res.data.wards)
      })
      .catch((err) => console.log(err))
  }
  const handleUpdate = async () => {
    if (parseInt(data.price) === 0) {
      setSnack({
        ...snack,
        open: true,
        message: 'Số tiền không được bằng 0!',
        type: 'error'
      })
      return
    }
    if (
      data.title === '' ||
      data.descriptions === '' ||
      data.major_id === '' ||
      data.price === 0 ||
      data.address.city.code === '' ||
      data.address.district.code === '' ||
      data.address.ward.code === ''
    ) {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.put(urlConfig.job_requests.updateJobRequests + `/${item._id}`, data)
      .then((res) => {
        if (res && res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: t('updateSuccess'),
            type: 'success'
          })
          setOpen(false)
          fetchData()
        }
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('updateFailed'),
          type: 'error'
        })
      )
  }
  useEffect(() => {
    fetchHuyen()
  }, [data.address?.city.code])
  useEffect(() => {
    fetchXa()
  }, [data.address?.district.code])
  useEffect(() => {
    getMajors()
    fetchTinh()
    fetchHuyen()
    fetchXa()
  }, [])
  return (
    <>
      <Snackbar />
      {data.price ? (
        <RootModal
          variant='Create'
          title={t('createRequest')}
          open={open}
          handleClose={() => setOpen(false)}
          handleOk={handleUpdate}
          closeOnly={false}
        >
          <Box sx={{ my: 2 }}>
            <TextField
              id='outlined-basic'
              label={t('title')}
              variant='outlined'
              defaultValue={data.title}
              fullWidth
              required
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <TextField
              id='outlined-basic'
              label={t('description')}
              variant='outlined'
              defaultValue={data.descriptions}
              fullWidth
              required
              sx={{
                mt: 2
              }}
              onChange={(e) => setData({ ...data, descriptions: e.target.value })}
            />
            <Stack direction='row' spacing={3} sx={{ mt: 2 }}>
              <TextField
                id='outlined-select-currency'
                select
                label={t('major')}
                defaultValue={data.major_id}
                required
                sx={{
                  width: '50%'
                }}
                onChange={(e) => setData({ ...data, major_id: e.target.value })}
              >
                {majors.majors?.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <FormControl>
                <InputLabel htmlFor='outlined-adornment-amount'>{t('price')}</InputLabel>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  value={data.price}
                  startAdornment={<InputAdornment position='start'>đ</InputAdornment>}
                  label={t('price')}
                  required
                  type='number'
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                />
              </FormControl>
            </Stack>
            <Stack direction='row' spacing={3} sx={{ mt: 2 }}>
              <TextField
                id='outlined-select-currency'
                select
                label={t('city')}
                defaultValue={data.address.city.name}
                required
                sx={{
                  width: '33%'
                }}
              >
                {tinh?.map((option) => (
                  <MenuItem
                    key={option.code}
                    value={option.name}
                    onClick={(e) => {
                      setData({
                        ...data,
                        address: {
                          ...data.address,
                          city: {
                            code: option.code,
                            name: option.name
                          }
                        }
                      })
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='outlined-select-currency'
                select
                label={t('district')}
                defaultValue={data.address.district.name}
                required
                sx={{
                  width: '33%'
                }}
              >
                {huyen?.map((option) => (
                  <MenuItem
                    key={option.code}
                    value={option.name}
                    onClick={(e) => {
                      setData({
                        ...data,
                        address: {
                          ...data.address,
                          district: {
                            code: option.code,
                            name: option.name
                          }
                        }
                      })
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='outlined-select-currency'
                select
                label={t('ward')}
                defaultValue={data.address.ward.name}
                required
                sx={{
                  width: '33%'
                }}
              >
                {xa?.map((option) => (
                  <MenuItem
                    key={option.code}
                    value={option.name}
                    onClick={(e) => {
                      setData({
                        ...data,
                        address: {
                          ...data.address,
                          ward: {
                            code: option.code,
                            name: option.name
                          }
                        }
                      })
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Box>
        </RootModal>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default EditJobRequest
