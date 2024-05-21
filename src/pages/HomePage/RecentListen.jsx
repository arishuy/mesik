import React, { useEffect, useState } from 'react'
import { Grid, Skeleton, Stack, Typography } from '@mui/material'
import urlConfig from '../../config/UrlConfig'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import SongCard from '../../common/components/SongCard'
import Empty from '../../common/components/Empty'
import useSnackbar from '../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'

const RecentListen = ({ allPlaylists }) => {
  const { t } = useTranslation()
  const [songs, setSongs] = useState([])
  const { snack, setSnack } = useSnackbar()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    AxiosInterceptors.get(urlConfig.user.getHistoryListen)
      .then((res) => {
        setSongs(res.data.songs)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <Typography variant='h4' py={3}>
        {t('recentlyListened')}
      </Typography>
      {!isLoading && songs.length === 0 && <Empty message={'Không có bài hát nào'} />}
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

export default RecentListen
