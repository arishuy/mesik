import React, { useEffect, useState } from 'react'
import { Card, Stack, Typography } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { useMusicPlayer } from '../../contexts/music.context'

const RandomSong = () => {
  const [songs, setSongs] = useState([])
  const { playSong } = useMusicPlayer()
  const handleSongClick = (song) => {
    // convert song to array
    song = [song]
    playSong(song)
  }
  useEffect(() => {
    Axios.get(urlConfig.music.getRandom)
      .then((res) => {
        setSongs(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <Typography variant='h4' py={3}>
        Trải nghiệm ngẫu nhiên
      </Typography>
      <Stack direction='row' spacing={2}>
        {songs.map((song) => (
          <Card
            sx={{
              padding: '20px',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                cursor: 'pointer',
                transform: 'scale(1.05)'
              }
            }}
            key={song.id}
            onClick={() => handleSongClick(song)}
          >
            <img src={song.photo_url} alt='album' width='250px' />
            <Typography variant='h6' pt={2}>
              {song.title}
            </Typography>
            <Typography variant='body2'>
              {song.artist.user.first_name} {song.artist.user.last_name}
            </Typography>
          </Card>
        ))}
      </Stack>
    </>
  )
}

export default RandomSong
