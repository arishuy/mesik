import React, { useEffect, useState } from 'react'
import { Card, Grid, Skeleton, Stack, Typography } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { useMusicPlayer } from '../../contexts/music.context'
import SongCard from '../../common/components/SongCard'
import useSnackbar from '../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const JustReleased = ({ allPlaylists }) => {
  const { t } = useTranslation()
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
      <Typography variant='h4' py={3}>
        {t('justReleased')}
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

export default JustReleased
