import React, { useEffect, useState, useCallback } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Autocomplete, Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'
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
    await AxiosInterceptors.get(urlConfig.music.getAllMusic + `?limit=100&page=1&name=${filterName}`)
      .then((res) => {
        setAllSongs(res.data.pagination.songs)
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

  // Debounce filterName changes
  const debouncedFetchAllSongs = useCallback(debounce(fetchAllSongs, 1000), [filterName])

  useEffect(() => {
    if (filterName === '') {
      setAllSongs([])
    } else {
      debouncedFetchAllSongs()
    }

    return () => {
      debouncedFetchAllSongs.cancel()
    }
  }, [filterName, debouncedFetchAllSongs])

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
