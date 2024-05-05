import React, { useEffect, useState } from 'react'
import { Card, Skeleton, Stack, Typography } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { useMusicPlayer } from '../../contexts/music.context'
import SongCard from '../../common/components/SongCard'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'
const JustReleased = ({ allPlaylists }) => {
  const [songs, setSongs] = useState([])
  const { snack, setSnack } = useSnackbar()
  const { playSong } = useMusicPlayer()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    Axios.get(urlConfig.music.justReleased)
      .then((res) => {
        setSongs(res.data.result)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <Snackbar />
      <Typography variant='h4' py={3}>
        Vừa phát hành
      </Typography>
      <Stack direction='row' spacing={2}>
        {isLoading && (
          <Skeleton
            variant='rounded'
            height={200}
            animation='wave'
            sx={{
              width: '100%'
            }}
          />
        )}
        {songs.map((song) => (
          <SongCard song={song} key={song._id} allPlaylists={allPlaylists} snack={snack} setSnack={setSnack} />
        ))}
      </Stack>
    </>
  )
}

export default JustReleased
