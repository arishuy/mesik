import React, { useEffect, useState } from 'react'
import { Card, Stack, Typography } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { useMusicPlayer } from '../../contexts/music.context'
import SongCard from '../../common/components/SongCard'

const JustReleased = () => {
  const [songs, setSongs] = useState([])
  const { playSong } = useMusicPlayer()
  const handleSongClick = (song) => {
    // convert song to array
    song = [song]
    playSong(song)
  }
  useEffect(() => {
    Axios.get(urlConfig.music.justReleased)
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
        Vừa phát hành
      </Typography>
      <Stack direction='row' spacing={2}>
        {songs.map((song) => (
          <SongCard song={song} key={song._id} />
        ))}
      </Stack>
    </>
  )
}

export default JustReleased
