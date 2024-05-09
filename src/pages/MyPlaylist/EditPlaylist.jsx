import React, { useState } from 'react'
import RootModal from '../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const EditPlaylist = ({ open, handleClose, fetchData, item }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [playlist, setPlaylist] = useState(item)
  const handleAddNew = async () => {
    if (playlist.title === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.put(urlConfig.playlists.updatePlaylist + `/${playlist._id}`, {
      title: playlist.title
    })
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('updatePlaylistSuccess'),
          type: 'success'
        })
        handleClose()
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
  return (
    <>
      <RootModal
        variant='Create'
        title='New Playlist'
        open={open}
        handleClose={handleClose}
        handleOk={() => {
          handleAddNew()
        }}
        closeOnly={false}
      >
        <Stack spacing={2} direction='column' sx={{ width: '100%', my: 2 }}>
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            value={playlist.title}
            placeholder='Nhập tên playlist'
            fullWidth
            onChange={(e) =>
              setPlaylist({
                ...playlist,
                title: e.target.value
              })
            }
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default EditPlaylist
