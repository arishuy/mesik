import React, { useEffect, useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Autocomplete, Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const AddNewPlaylist = ({ open, handleClose, section, setSection }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [newPlaylist, setNewPlaylist] = useState({
    title: '',
    song_id: []
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
    if (newPlaylist.title === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.post(urlConfig.playlists.createPlaylist, newPlaylist)
      .then((res) => {
        setSection({
          ...section,
          items: [...section.items, res.data.playlist]
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
    if (filterName === '') return
    fetchAllSongs()
  }, [filterName])
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
              setNewPlaylist({
                ...newPlaylist,
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
              setNewPlaylist({
                ...newPlaylist,
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
        </Stack>
      </RootModal>
    </>
  )
}

export default AddNewPlaylist
