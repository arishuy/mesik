import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import SongCard from '../../common/components/SongCard'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'

const RandomSong = ({ allPlaylists }) => {
  const [songs, setSongs] = useState([])
  const { snack, setSnack } = useSnackbar()
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
      <Snackbar />
      <Typography variant='h4' py={3}>
        Trải nghiệm ngẫu nhiên
      </Typography>
      <Stack direction='row' spacing={2}>
        {songs.map((song) => (
          <SongCard song={song} key={song._id} allPlaylists={allPlaylists} snack={snack} setSnack={setSnack} />
        ))}
      </Stack>
    </>
  )
}

export default RandomSong
