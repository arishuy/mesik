import React, { useEffect, useState } from 'react'
import RootModal from '../../components/Modal/RootModal'
import { Stack, TextField, Autocomplete } from '@mui/material'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'
import UploadPhoto from '../../common/components/UploadPhoto'
const AddNewAlbum = ({ open, handleClose, fetchData }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [formData, setFormData] = useState(new FormData())
  const [allSongs, setAllSongs] = useState([])
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    song_id: [],
    photo: '',
    artist_id: user.artist
  })
  const fetchAllSongs = async () => {
    await AxiosInterceptors.get(urlConfig.music.getAllMusicByArtist + `/${user.artist}`)
      .then((res) => {
        setAllSongs(res.data.result)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('fetchDataFail'),
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
        artist_id: newAlbum.artist_id,
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
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('addNewMajorSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('addNewMajorFail'),
          type: 'error'
        })
      )
  }
  useEffect(() => {
    fetchAllSongs()
  }, [])
  return (
    <>
      <Snackbar />
      <RootModal
        variant='Create'
        title='New Album'
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
              <TextField {...params} variant='outlined' label='Songs' placeholder='Select song' />
            )}
          />
        </Stack>
        <UploadPhoto
          file={newAlbum.photo}
          setFormData={setFormData}
          information={newAlbum}
          setInformation={setNewAlbum}
        />
      </RootModal>
    </>
  )
}

export default AddNewAlbum
