import React, { useEffect, useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const EditGenre = ({ open, handleClose, id, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [genre, setGenre] = useState({})
  const handleEdit = async () => {
    if (genre.title === '' || genre.desyearcription === '' || genre.photo === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.put(urlConfig.genres.updateGenre + `/${id}`, genre)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('updateGenreSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('updateGenreFail'),
          type: 'error'
        })
      )
  }

  const fetchGenre = async () => {
    await AxiosInterceptors.get(urlConfig.genres.getGenreById + `/${id}`)
      .then((res) => {
        setGenre(res.data.genre)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('getGenreFail'),
          type: 'error'
        })
      })
  }
  useEffect(() => {
    fetchGenre()
  }, [id])
  return (
    <>
      {genre && genre.name && (
        <RootModal
          variant='Create'
          title={t('genre')}
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
              value={genre.name}
              onChange={(e) =>
                setGenre({
                  ...genre,
                  name: e.target.value
                })
              }
            />
            <TextField
              id='outlined-basic'
              label='Description'
              variant='outlined'
              fullWidth
              value={genre.description}
              onChange={(e) =>
                setGenre({
                  ...genre,
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

export default EditGenre
