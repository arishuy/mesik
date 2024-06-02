import React, { useEffect, useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Autocomplete, Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
import UploadPhoto from '../../../../common/components/UploadPhoto'

const AddNewPlaylist = ({ open, handleClose, section, setSection }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [formData, setFormData] = useState(new FormData())
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    song_id: [],
    photo: ''
  })
  const [filterName, setFilterName] = useState('')
  const [allSongs, setAllSongs] = useState([])

  const fetchAllSongs = async () => {
    await AxiosInterceptors.get(urlConfig.music.getAllMusic)
      .then((res) => {
        setAllSongs(res.data.songs)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Lấy dữ liệu thất bại',
          type: 'error'
        })
      })
  }

  const handleAddNew = async () => {
    if (newAlbum.title === '' || newAlbum.song_id.length === 0 || newAlbum.photo === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.post(
      urlConfig.albums.createAlbum,
      {
        title: newAlbum.title,
        artist_id: null,
        song_id: newAlbum.song_id,
        photo: formData.get('photo')
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then((res) => {
        setSection({
          ...section,
          items: [...section.items, res.data.album]
        })
        setSnack({
          ...snack,
          open: true,
          message: t('addNewPlaylistSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('addNewPlaylistFail'),
          type: 'error'
        })
      )
  }

  useEffect(() => {
    fetchAllSongs()
  }, [])

  return (
    <>
      <RootModal
        variant='Create'
        title='New Playlist'
        open={open}
        handleClose={handleClose}
        handleOk={() => {
          handleAddNew()
          handleClose()
        }}
        closeOnly={false}
      >
        <Stack spacing={2} direction='column' sx={{ width: '100%', my: 2 }}>
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            placeholder='Nhập tên playlist'
            fullWidth
            onChange={(e) =>
              setNewAlbum({
                ...newAlbum,
                title: e.target.value
              })
            }
          />
          <Autocomplete
            sx={{ m: 1 }}
            multiple
            options={allSongs}
            getOptionLabel={(option) => option.title}
            disableCloseOnSelect
            onChange={(e, value) => {
              setNewAlbum({
                ...newAlbum,
                song_id: value.map((song) => song._id)
              })
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                label='Songs'
                placeholder='Select song'
                onChange={(e) => setFilterName(e.target.value)}
              />
            )}
          />
          <UploadPhoto
            file={newAlbum.photo}
            setFormData={setFormData}
            information={newAlbum}
            setInformation={setNewAlbum}
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default AddNewPlaylist
