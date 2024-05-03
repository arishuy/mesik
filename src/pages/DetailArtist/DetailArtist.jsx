import { Avatar, Card, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'
import moment from 'moment'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import Empty from '../../common/components/Empty'
import Loading from '../../common/components/Loading/Loading'
import { Helmet } from 'react-helmet-async'
import SongCardVer2 from '../../common/components/SongCard_Ver2'

const DetailArtist = () => {
  const id = useParams()
  const { playSong } = useMusicPlayer()
  const [artist, setArtist] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [allPlaylists, setAllPlaylists] = React.useState([])

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.artists.getArtistById + `/${id.nameId}`)
      .then((res) => {
        setArtist(res.data.artist)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const fetchPlaylists = async () => {
    await AxiosInterceptors.get(urlConfig.playlists.getAllPlaylistsByUser)
      .then((res) => {
        setAllPlaylists(res.data.playlists)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
    fetchPlaylists()
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
        <title>Thông Tin Nghệ Sĩ</title>
      </Helmet>
      <Card
        sx={{
          padding: '20px',
          backgroundImage: `url(https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_19.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
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
          <Grid item xs={12} md={6} key={song._id}>
            <SongCardVer2 song={song} allPlaylists={allPlaylists} />
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
