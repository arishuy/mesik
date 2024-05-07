import { Avatar, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMusicPlayer } from '../../contexts/music.context'
import moment from 'moment'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import Empty from '../../common/components/Empty'
import Loading from '../../common/components/Loading/Loading'
import { Helmet } from 'react-helmet-async'
import SongCardVer2 from '../../common/components/SongCard_Ver2'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'

const DetailArtist = () => {
  const id = useParams()
  const { playSong } = useMusicPlayer()
  const navigation = useNavigate()
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
            <Typography variant='h1'>{artist.display_name}</Typography>
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
        <Grid container spacing={3}>
          {artist.albums?.map((album) => (
            <Grid item xs={12} md={6} lg={3} key={album.id}>
              <div className='song-card'>
                <img className='song-card_image' src={album.photo_url} alt='David Bowie - Aladdin Sane' />
                <div className='song-card_info'>
                  <div className='song-card_info_artist'>{album.songs.length} bài hát</div>
                  <div className='song-card_info_album'> {moment(album.createdAt).format('DD/MM/YYYY')}</div>
                  <div className='song-card_info_title'>{album.title}</div>
                </div>
                <div className='song-card_play'>
                  <Stack direction='row' spacing={1} pt={2}>
                    <IconButton onClick={() => playSong(album.songs)} color='success'>
                      <PlayCircleFilledWhiteOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => navigation(`/album/${album._id}`)} color='primary'>
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Stack>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default DetailArtist
