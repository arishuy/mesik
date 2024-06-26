import React, { useEffect, useState, useContext, useRef } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField, MenuItem, Button, Typography, FormControlLabel, Checkbox, Autocomplete } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useTranslation } from 'react-i18next'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const EditSong = ({ open, handleClose, id, fetchData, snack, setSnack, genres, regions }) => {
  const { t } = useTranslation()
  const [artists, setArtists] = useState([])
  const [newSong, setNewSong] = useState({})
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
    await AxiosInterceptors.put(urlConfig.music.updateMusic + `/${id}`, {
      title: newSong.title,
      release_date: newSong.release_date,
      duration: newSong.duration,
      genre: newSong.genre,
      region: newSong.region,
      artist: newSong.artist,
      isPremium: newSong.isPremium,
      featuredArtists: newSong.featuredArtists.map((artist) => artist._id)
    })
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('updateSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('updateFail'),
          type: 'error'
        })
      )
  }
  const fetchMusic = async () => {
    await AxiosInterceptors.get(urlConfig.music.getMusicById + `/${id}`)
      .then((res) => {
        setNewSong({ ...res.data.song, photo: res.data.song.photo_url })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const fetchArtist = async () => {
    const res = await AxiosInterceptors.get(urlConfig.artists.getAllArtists)
    if (res.status === 200) {
      setArtists(res.data.artists)
    }
  }
  useEffect(() => {
    fetchArtist()
    fetchMusic()
  }, [id])
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
            <Autocomplete
              sx={{ m: 1 }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              options={artists}
              multiple
              getOptionLabel={(option) => option.display_name}
              value={artists.filter((artist) =>
                newSong.featuredArtists.some((featuredArtist) => featuredArtist._id === artist._id)
              )}
              disableCloseOnSelect
              onChange={(e, value) => {
                setNewSong({
                  ...newSong,
                  featuredArtists: value
                })
              }}
              renderInput={(params) => <TextField {...params} variant='outlined' label={t('featuredArtists')} />}
            />
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
