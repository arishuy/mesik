import React, { useEffect, useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const EditPlaylist = ({ open, handleClose, id, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [playlist, setPlaylist] = useState({})
  const handleEdit = async () => {
    if (playlist.title === '' || playlist.desyearcription === '' || playlist.photo === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.put(urlConfig.playlists.updatePlaylist + `/${id}`, playlist)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('updatePlaylistSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('updatePlaylistFail'),
          type: 'error'
        })
      )
  }

  const fetchPlaylist = async () => {
    await AxiosInterceptors.get(urlConfig.playlists.getPlaylistById + `/${id}`)
      .then((res) => {
        setPlaylist(res.data.playlist)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('getPlaylistFail'),
          type: 'error'
        })
      })
  }
  useEffect(() => {
    fetchPlaylist()
  }, [id])
  return (
    <>
      {playlist && playlist.name && (
        <RootModal
          variant='Create'
          title={t('playlist')}
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
              value={playlist.name}
              onChange={(e) =>
                setPlaylist({
                  ...playlist,
                  name: e.target.value
                })
              }
            />
            <TextField
              id='outlined-basic'
              label='Description'
              variant='outlined'
              fullWidth
              value={playlist.description}
              onChange={(e) =>
                setPlaylist({
                  ...playlist,
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

export default EditPlaylist
