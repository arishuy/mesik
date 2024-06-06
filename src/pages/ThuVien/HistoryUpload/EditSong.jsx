import React, { useState } from 'react'
import RootModal from '../../../components/Modal/RootModal'
import { Stack, TextField, MenuItem, FormControlLabel, Checkbox } from '@mui/material'
import AxiosInterceptors from '../../../common/utils/axiosInterceptors'
import { useTranslation } from 'react-i18next'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import urlConfig from '../../../config/UrlConfig'

const EditSong = ({ open, handleClose, song, fetchData, snack, setSnack, genres, regions }) => {
  const { t } = useTranslation()
  const [newSong, setNewSong] = useState(song)
  const handleUpdate = async () => {
    if (newSong.title === '' || newSong.release_date === '' || newSong.photo === '' || newSong.genre === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    if (newSong.release_date > dayjs()) {
      setSnack({
        ...snack,
        open: true,
        message: t('releaseDateError'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.put(urlConfig.music.updateMusicByArtist + `/${song._id}`, {
      title: newSong.title,
      release_date: newSong.release_date,
      duration: newSong.duration,
      genre: newSong.genre,
      region: newSong.region,
      artist: newSong.artist,
      isPremium: newSong.isPremium
    })
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('updateSongSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('updateSongFail'),
          type: 'error'
        })
      )
  }
  return (
    <>
      {genres.length > 0 && newSong.artist && newSong.genre && (
        <RootModal
          variant='Create'
          title={t('edit') + ' ' + newSong.title}
          open={open}
          handleClose={handleClose}
          handleOk={() => {
            handleUpdate()
            handleClose()
          }}
          closeOnly={false}
        >
          <Stack spacing={2} direction='column' sx={{ width: '100%', my: 2 }}>
            <TextField
              id='outlined-basic'
              label={t('title')}
              variant='outlined'
              fullWidth
              value={newSong.title}
              onChange={(e) =>
                setNewSong({
                  ...newSong,
                  title: e.target.value
                })
              }
            />
            <Stack direction='row' spacing={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={t('releaseDate')}
                  value={dayjs(newSong.release_date)}
                  onChange={(newValue) =>
                    setNewSong({
                      ...newSong,
                      release_date: newValue
                    })
                  }
                />
              </LocalizationProvider>
              <TextField
                id='outlined-basic'
                label={t('duration')}
                variant='outlined'
                fullWidth
                value={newSong.duration}
                type='number'
                sx={{
                  width: '50%'
                }}
                onChange={(e) =>
                  setNewSong({
                    ...newSong,
                    duration: e.target.value
                  })
                }
              />
            </Stack>

            <Stack direction='row' spacing={3}>
              <TextField
                id='outlined-select-currency'
                select
                label={t('genre')}
                required
                value={newSong.genre}
                sx={{
                  width: '50%'
                }}
                onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
              >
                {genres?.map((option) => (
                  <MenuItem key={option._id} value={option._id} selected={option._id === newSong.genre}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='outlined-select-currency'
                select
                label={t('region')}
                required
                value={newSong.region}
                sx={{
                  width: '50%'
                }}
                onChange={(e) => setNewSong({ ...newSong, region: e.target.value })}
              >
                {regions?.map((option) => (
                  <MenuItem key={option._id} value={option._id} selected={option._id === newSong.region}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <TextField
              id='outlined-select-currency'
              label={t('artist')}
              required
              value={newSong?.artist?.display_name}
              disabled
            ></TextField>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={newSong.isPremium}
                  onChange={(e) => setNewSong({ ...newSong, isPremium: e.target.checked })}
                />
              }
              label='Premium'
            />
          </Stack>
        </RootModal>
      )}
    </>
  )
}

export default EditSong
