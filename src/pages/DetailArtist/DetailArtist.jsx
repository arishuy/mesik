import { Avatar, Card, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'
import moment from 'moment'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import Empty from '../../common/components/Empty'

const DetailArtist = () => {
  const id = useParams()
  const { playSong } = useMusicPlayer()
  const [artist, setArtist] = useState({})

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.artists.getArtistById + `/${id.nameId}`)
      .then((res) => {
        setArtist(res.data.artist)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const convertToMinutes = (duration) => {
    let minutes = Math.floor(duration / 60)
    let seconds = Math.floor(duration - minutes * 60)
    return `${minutes}:${seconds}`
  }
  const handleSongClick = (song) => {
    // convert song to array
    song = [song]
    playSong(song)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      <Card
        sx={{
          padding: '20px',
          backgroundImage: `url(https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_19.jpg)`
        }}
      >
        <Stack direction='row' spacing={5} justifyContent='space-around' alignItems='center'>
          <Stack direction='column' spacing={3}>
            <Typography variant='h1'>
              {artist.user?.first_name} {artist.user?.last_name}
            </Typography>
            <Typography variant='h4'>{artist.descriptions}</Typography>
          </Stack>
          <Avatar alt='Remy Sharp' src={artist.user?.photo_url} sx={{ width: 300, height: 300 }} />
        </Stack>
      </Card>
      <Typography variant='h4' py={3}>
        Bài hát nổi bật
      </Typography>
      <Grid container spacing={2}>
        {artist.songs?.length === 0 && <Empty message={'Không có bài hát nào'} />}
        {artist.songs?.map((song) => (
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
                    <Typography variant='body2'>
                      {artist.user.first_name} {artist.user.last_name}
                    </Typography>
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
        Album
      </Typography>
      {artist.albums?.length === 0 ? (
        <Empty message={'Không có album nào'} />
      ) : (
        <Stack direction='row' spacing={2}>
          {artist.albums?.map((album) => (
            <Card
              sx={{
                padding: '20px',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  cursor: 'pointer',
                  transform: 'scale(1.05)'
                }
              }}
              key={album._id}
              onClick={() => {
                playSong(album.songs)
              }}
            >
              <img src={album.photo_url} alt='album' width='250px' />
              <Typography variant='h6' pt={2}>
                {album.title}
              </Typography>
              <Typography variant='body2'>{moment(album.updatedAt).format('YYYY')}</Typography>
            </Card>
          ))}
        </Stack>
      )}
    </div>
  )
}

export default DetailArtist
