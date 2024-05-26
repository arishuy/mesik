import React, { useEffect, useState } from 'react'
import { Card, Chip, Grid, Skeleton, Stack, Typography } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { useMusicPlayer } from '../../contexts/music.context'
import SongCardVer2 from '../../common/components/SongCard_Ver2'
import useSnackbar from '../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
const JustReleased = ({ allPlaylists }) => {
  const { t } = useTranslation()
  const [songs, setSongs] = useState([])
  const { snack, setSnack } = useSnackbar()
  const { playSong } = useMusicPlayer()
  const [isLoading, setIsLoading] = useState(true)
  const [region, setRegion] = useState(0)
  const [data, setData] = useState({})
  useEffect(() => {
    Axios.get(urlConfig.music.justReleased)
      .then((res) => {
        setData(res.data.result)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (region === 0) {
      setSongs(data?.songs)
    } else if (region === 1) {
      setSongs(data?.songs_vn)
    } else if (region === 2) {
      setSongs(data?.another_songs)
    }
  }, [region, data])
  return (
    <>
      <Stack direction='row' spacing={2} mb={2} justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' py={3}>
          {t('justReleased')}
        </Typography>
        <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
          <Chip label={t('all')} onClick={() => setRegion(0)} color={region === 0 ? 'primary' : 'default'} />
          <Chip label={t('vietnam')} onClick={() => setRegion(1)} color={region === 1 ? 'primary' : 'default'} />
          <Chip label={t('another')} onClick={() => setRegion(2)} color={region === 2 ? 'primary' : 'default'} />
        </Stack>
      </Stack>
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
        {songs?.map((song) => (
          <Grid item xs={12} md={4} lg={4} key={song._id}>
            <SongCardVer2 song={song} allPlaylists={allPlaylists} snack={snack} setSnack={setSnack} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default JustReleased
