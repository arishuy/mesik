import React, { useEffect, useState, useContext, useRef } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField, MenuItem, Button, Typography } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { GenreContext } from '../../../../contexts/genre.context'
import { useTranslation } from 'react-i18next'
import { RegionContext } from '../../../../contexts/region.context'

const EditSong = ({ open, handleClose, id, fetchData, snack, setSnack, genres, regions }) => {
  const { t } = useTranslation()
  const [newSong, setNewSong] = useState({})
  const handleUpdate = async () => {
    if (newSong.title === '' || newSong.year === '' || newSong.photo === '' || newSong.genre === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.put(urlConfig.music.updateMusic + `/${id}`, {
      title: newSong.title,
      year: newSong.year,
      duration: newSong.duration,
      genre: newSong.genre,
      region: newSong.region,
      artist: newSong.artist
    })
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
  const fetchMusic = async () => {
    await AxiosInterceptors.get(urlConfig.music.getMusicById + `/${id}`)
      .then((res) => {
        setNewSong({ ...res.data.song, photo: res.data.song.photo_url })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchMusic()
  }, [id])
  return (
    <>
      {genres.length > 0 && newSong.artist && newSong.genre && (
        <RootModal
          variant='Create'
          title='Edit song'
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
              label='Title'
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
              <TextField
                id='outlined-basic'
                label='Year'
                variant='outlined'
                fullWidth
                value={newSong.year}
                type='number'
                sx={{
                  width: '50%'
                }}
                onChange={(e) =>
                  setNewSong({
                    ...newSong,
                    year: e.target.value
                  })
                }
              />{' '}
              <TextField
                id='outlined-basic'
                label='Duration'
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
                label='Genre'
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
                label='Region'
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
              label='Artist'
              required
              value={newSong?.artist?.display_name}
              disabled
            ></TextField>
          </Stack>
        </RootModal>
      )}
    </>
  )
}

export default EditSong
