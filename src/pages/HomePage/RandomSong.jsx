import React, { useEffect, useState } from 'react'
import { Card, Stack, Typography } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import SongCard from '../../common/components/SongCard'

const RandomSong = () => {
  const [songs, setSongs] = useState([])
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
          <SongCard song={song} key={song._id} />
        ))}
      </Stack>
    </>
  )
}

export default RandomSong
