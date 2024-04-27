import React, { useEffect, useState } from 'react'
import { Card, Stack, Typography } from '@mui/material'
import urlConfig from '../../config/UrlConfig'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import SongCard from '../../common/components/SongCard'
import Empty from '../../common/components/Empty'

const RecentListen = () => {
  const [songs, setSongs] = useState([])
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
      <Typography variant='h4' py={3}>
        Nghe gần đây
      </Typography>
      {songs.length === 0 && <Empty message={'Không có bài hát nào'} />}
      <Stack direction='row' spacing={2}>
        {songs.map((song) => (
          <SongCard song={song} key={song.id} />
        ))}
      </Stack>
    </>
  )
}

export default RecentListen
