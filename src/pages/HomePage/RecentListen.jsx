import React, { useEffect, useState } from 'react'
import { Skeleton, Stack, Typography } from '@mui/material'
import urlConfig from '../../config/UrlConfig'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import SongCard from '../../common/components/SongCard'
import Empty from '../../common/components/Empty'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'

const RecentListen = ({ allPlaylists }) => {
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
      <Snackbar />
      <Typography variant='h4' py={3}>
        Nghe gần đây
      </Typography>
      {!isLoading && songs.length === 0 && <Empty message={'Không có bài hát nào'} />}
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
          <SongCard song={song} key={song.id} allPlaylists={allPlaylists} snack={snack} setSnack={setSnack} />
        ))}
      </Stack>
    </>
  )
}

export default RecentListen
