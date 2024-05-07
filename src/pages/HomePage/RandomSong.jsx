import React, { useEffect, useState } from 'react'
import { Grid, Skeleton, Stack, Typography } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import SongCard from '../../common/components/SongCard'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'

const RandomSong = ({ allPlaylists }) => {
  const [songs, setSongs] = useState([])
  const { snack, setSnack } = useSnackbar()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    Axios.get(urlConfig.music.getRandom)
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
        Trải nghiệm ngẫu nhiên
      </Typography>
      <Grid container spacing={2}>
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
          <Grid item xs={6} md={4} lg={2} key={song._id}>
            <SongCard song={song} allPlaylists={allPlaylists} snack={snack} setSnack={setSnack} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default RandomSong
