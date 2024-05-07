import React, { useEffect, useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const EditAlbum = ({ open, handleClose, id, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [album, setAlbum] = useState({})
  const handleEdit = async () => {
    if (album.title === '' || album.desyearcription === '' || album.photo === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.put(urlConfig.albums.updateAlbum + `/${id}`, album)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('updateAlbumSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('updateAlbumFail'),
          type: 'error'
        })
      )
  }

  const fetchAlbum = async () => {
    await AxiosInterceptors.get(urlConfig.albums.getAlbumById + `/${id}`)
      .then((res) => {
        setAlbum(res.data.album)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('getAlbumFail'),
          type: 'error'
        })
      })
  }
  useEffect(() => {
    fetchAlbum()
  }, [id])
  return (
    <>
      {album && album.name && (
        <RootModal
          variant='Create'
          title={t('album')}
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
              value={album.name}
              onChange={(e) =>
                setAlbum({
                  ...album,
                  name: e.target.value
                })
              }
            />
            <TextField
              id='outlined-basic'
              label='Description'
              variant='outlined'
              fullWidth
              value={album.description}
              onChange={(e) =>
                setAlbum({
                  ...album,
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

export default EditAlbum
