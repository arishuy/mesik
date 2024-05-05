import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import urlConfig from '../../config/UrlConfig'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import SongCard from '../../common/components/SongCard'
import Empty from '../../common/components/Empty'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'

const RecentListen = ({ allPlaylists }) => {
  const [songs, setSongs] = useState([])
  const { snack, setSnack } = useSnackbar()
  useEffect(() => {
    AxiosInterceptors.get(urlConfig.user.getHistoryListen)
      .then((res) => {
        setSongs(res.data.songs)
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
      {songs.length === 0 && <Empty message={'Không có bài hát nào'} />}
      <Stack direction='row' spacing={2}>
        {songs.map((song) => (
          <SongCard song={song} key={song.id} allPlaylists={allPlaylists} snack={snack} setSnack={setSnack} />
        ))}
      </Stack>
    </>
  )
}

export default RecentListen
