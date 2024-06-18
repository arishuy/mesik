import { Avatar, Button, Card, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import { LoadingButton } from '@mui/lab'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import GroupRemoveRoundedIcon from '@mui/icons-material/GroupRemoveRounded'
import { AppContext } from '../../contexts/app.context'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import RelatedArtists from './RelatedArtists'
import useResponsive from '../../hooks/useResponsive'
import { useTranslation } from 'react-i18next'

const DetailArtist = () => {
  const { t } = useTranslation()
  const isMobile = useResponsive('down', 'sm')
  const id = useParams()
  const { isAuthenticated, profile } = useContext(AppContext)
  const { playSong } = useMusicPlayer()
  const navigation = useNavigate()
  const [artist, setArtist] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [allPlaylists, setAllPlaylists] = React.useState([])
  const [isFollow, setIsFollow] = React.useState(false)
  const [totalFollowers, setTotalFollowers] = React.useState()
  const [isClick, setIsClick] = React.useState(false)

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.artists.getArtistById + `/${id.nameId}`)
      .then((res) => {
        setArtist(res.data.artist)
        setTotalFollowers(res.data.artist.followers.length)
        setIsFollow(res.data.artist.followers.includes(profile?._id))
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

  const handleFollow = async () => {
    setIsClick(true)
    await AxiosInterceptors.get(urlConfig.user.followArtist + `/${id.nameId}`)
      .then((res) => {
        setIsFollow(res.data.result.isFollow)
        setTotalFollowers(res.data.result.totalFollow)
        setIsClick(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlePlayAlbum = async (album) => {
    playSong(album.songs)
    await AxiosInterceptors.post(`${urlConfig.albums.playAlbum}/play`, {
      id: album._id
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
    isAuthenticated && fetchPlaylists()
  }, [id])
  return isLoading ? (
    <Loading />
  ) : (
    <div style={isMobile ? { width: '100%', padding: '20px 20px' } : { width: '100%', padding: '20px 100px' }}>
      <Helmet>
        <title>{t('artistInformation')}</title>
      </Helmet>
      <Card
        sx={{
          padding: '20px',
          backgroundImage: `url(https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-19.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Stack
          direction={isMobile ? 'column-reverse' : 'row'}
          spacing={5}
          justifyContent='space-around'
          alignItems='center'
        >
          <Stack direction='column' spacing={3}>
            <Typography
              variant='h1'
              component='h1'
              sx={{
                background: '-webkit-linear-gradient(#000, #ff7878)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {artist.display_name}
            </Typography>
            <Stack direction='row' spacing={3} alignItems='center'>
              <Typography variant='h6'>
                {totalFollowers} {t('followers')}{' '}
              </Typography>
              {!isFollow
                ? isAuthenticated && (
                    <LoadingButton
                      loading={isClick}
                      variant='outlined'
                      onClick={() => handleFollow()}
                      sx={{
                        borderRadius: '20px'
                      }}
                    >
                      <GroupAddRoundedIcon
                        sx={{
                          mr: 1
                        }}
                      />
                      {t('follow')}
                    </LoadingButton>
                  )
                : isAuthenticated && (
                    <LoadingButton
                      loading={isClick}
                      variant='outlined'
                      onClick={() => handleFollow()}
                      sx={{
                        borderRadius: '20px'
                      }}
                    >
                      <GroupRemoveRoundedIcon
                        sx={{
                          mr: 1
                        }}
                      />
                      {t('unfollow')}
                    </LoadingButton>
                  )}
            </Stack>
          </Stack>
          <Avatar alt='Remy Sharp' src={artist.user?.photo_url} sx={{ width: 300, height: 300 }} />
        </Stack>
      </Card>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' py={3}>
          {t('featuredSong')}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to={`/artist/${id.nameId}/songs`}
            style={{
              textDecoration: 'none',
              color: 'black'
            }}
          >
            {t('all')}
          </Link>
          <NavigateNextIcon />
        </div>
      </Stack>
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
        <Empty message={t('noResults')} />
      ) : (
        <Grid container spacing={3}>
          {artist.albums?.map((album) => (
            <Grid item xs={12} md={6} lg={3} key={album.id}>
              <div className='song-card'>
                <img className='song-card_image' src={album.photo_url} alt='David Bowie - Aladdin Sane' />
                <div className='song-card_info'></div>
                <div className='song-card_play'>
                  <Stack direction='row' spacing={1} pt={2}>
                    <IconButton onClick={() => handlePlayAlbum(album)} color='success'>
                      <PlayCircleFilledWhiteOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => navigation(`/album/${album._id}`)} color='primary'>
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Stack>
                </div>
              </div>
              <Typography variant='h6' sx={{ textAlign: 'left', py: 1, ml: 1 }} noWrap>
                {album.title} ({moment(album.createdAt).format('YYYY')})
                <div
                  className='song-card_info_album'
                  style={{
                    color: 'gray'
                  }}
                >
                  {album.songs.length} {t('songs')}
                </div>
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
      <RelatedArtists id={id.nameId} />
    </div>
  )
}

export default DetailArtist
