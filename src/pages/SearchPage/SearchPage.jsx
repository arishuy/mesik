import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import urlConfig from '../../config/UrlConfig'
import { Avatar, Card, Grid, Stack, Typography } from '@mui/material'
import Axios from 'axios'
import Empty from '../../common/components/Empty'
import { useMusicPlayer } from '../../contexts/music.context'
import Loading from '../../common/components/Loading/Loading'
import { Helmet } from 'react-helmet-async'

const SearchPage = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const { playSong } = useMusicPlayer()
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = []

  for (let entry of searchParams.entries()) {
    params.push(entry)
  }

  const keyword = params[0][1]
  const fetchData = async () => {
    await Axios.post(urlConfig.keyword.search, {
      keyword: keyword
    })
      .then((res) => {
        setData(res.data.result)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleSongClick = (song) => {
    // convert song to array
    song = [song]
    playSong(song)
  }
  const convertToMinutes = (duration) => {
    let minutes = Math.floor(duration / 60)
    let seconds = Math.floor(duration - minutes * 60)
    return `${minutes}:${seconds}`
  }
  useEffect(() => {
    fetchData()
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      <Helmet>
        <title>Tìm Kiếm</title>
      </Helmet>
      <Typography variant='h4' py={3}>
        Bài hát
      </Typography>
      <Grid container spacing={2}>
        {data.songs?.length === 0 && (
          <>
            <Grid item xs={12}>
              <Empty message={'Không có bài hát nào'} />
            </Grid>
          </>
        )}
        {data.songs?.map((song) => (
          <Grid item xs={6} key={song._id}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  cursor: 'pointer',
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => handleSongClick(song)}
            >
              <div>
                <Stack direction='row' spacing={3}>
                  <img src={song.photo_url} alt='album' width={100} />
                  <Stack direction='column' justifyContent='center' alignItems='start'>
                    <Typography variant='h6'>{song.title}</Typography>
                    <Typography variant='body2'>{song.artist.display_name}</Typography>
                    <Typography variant='subtitle2'>{song.play_count} lượt nghe</Typography>
                  </Stack>
                </Stack>
              </div>
              <Typography variant='body2' p={3}>
                {convertToMinutes(song.duration)}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant='h4' py={3}>
        Nghệ sĩ nổi tiếng
      </Typography>
      <Grid container spacing={3}>
        {data.artists?.length === 0 && (
          <>
            <Grid item xs={12}>
              <Empty message={'Không có nghệ sĩ nào'} />
            </Grid>
          </>
        )}

        {data.artists?.map((artist) => (
          <Grid item xs={2} key={artist.id}>
            <Stack
              direction='column'
              alignItems='center'
              key={artist._id}
              px={3}
              onClick={() => navigate(`/artist/${artist._id}`)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              <Avatar alt='artist' src={artist.user.photo_url} sx={{ width: 200, height: 200 }} />
              <Typography variant='h6' padding={3}>
                {artist.display_name}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default SearchPage
