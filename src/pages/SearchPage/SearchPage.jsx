import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import urlConfig from '../../config/UrlConfig'
import { Avatar, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import Axios from 'axios'
import Empty from '../../common/components/Empty'
import Loading from '../../common/components/Loading/Loading'
import { Helmet } from 'react-helmet-async'
import SongCardVer2 from '../../common/components/SongCard_Ver2'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import { useMusicPlayer } from '../../contexts/music.context'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import useResponsive from '../../hooks/useResponsive'
import { useTranslation } from 'react-i18next'

const SearchPage = () => {
  const { t } = useTranslation()
  const isMobile = useResponsive('down', 'sm')
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [allPlaylists, setAllPlaylists] = React.useState([])
  const { playSong } = useMusicPlayer()
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
  const fetchPlaylists = async () => {
    await AxiosInterceptors.get(urlConfig.playlists.getAllPlaylistsByUser)
      .then((res) => {
        setAllPlaylists(res.data.playlists)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlePlayAlbum = async (album) => {
    playSong(album.songs, false)
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
    fetchPlaylists()
  }, [])
  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [searchParams])

  return isLoading ? (
    <Loading />
  ) : (
    <div style={isMobile ? { width: '100%', padding: '20px 20px' } : { width: '100%', padding: '20px 100px' }}>
      <Helmet>
        <title>
          {t('search')} | {keyword}
        </title>
      </Helmet>
      {data.songs?.length === 0 && data.albums.length === 0 && data.artists?.length === 0 && data.song === null && (
        <Empty message={t('noResults')} />
      )}
      {data.songs?.length > 0 && (
        <>
          <Typography variant='h4' py={3}>
            {t('song')}
          </Typography>
          <Grid container spacing={2}>
            {data.songs?.map((song) => (
              <Grid item xs={12} md={6} key={song._id}>
                <SongCardVer2 song={song} allPlaylists={allPlaylists} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {data.song ? (
        <>
          <Typography variant='h4' py={3}>
            {t('songWithLyric')}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} key={data.song._id}>
              <SongCardVer2 song={data.song} allPlaylists={allPlaylists} />
            </Grid>
          </Grid>
        </>
      ) : null}
      {data.artists?.length > 0 && (
        <>
          <Typography variant='h4' py={3}>
            {t('artist')}
          </Typography>
          <Grid container spacing={3}>
            {data.artists?.map((artist) => (
              <Grid item sm={6} md={2} key={artist.id}>
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
        </>
      )}
      {data.albums.length > 0 && (
        <>
          <Typography variant='h4' py={3}>
            Album
          </Typography>
          <Grid container spacing={2}>
            {data.albums.map((album) => (
              <Grid item xs={12} md={6} lg={3} key={album._id}>
                <div className='song-card'>
                  <img className='song-card_image' src={album.photo_url} alt='David Bowie - Aladdin Sane' />
                  <div className='song-card_play'>
                    <Stack direction='row' spacing={1} pt={2}>
                      <Tooltip title={t('Phát ngay')}>
                        <IconButton
                          onClick={(e) => {
                            handlePlayAlbum(album)
                          }}
                          color='success'
                        >
                          <PlayCircleFilledWhiteOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('detailInfo')}>
                        <IconButton
                          onClick={(e) => {
                            navigate(`/album/${album._id}`)
                          }}
                          color='primary'
                        >
                          <InfoOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </div>
                </div>
                <Typography variant='h6' sx={{ textAlign: 'left', py: 1, ml: 1 }}>
                  {album.title}
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
        </>
      )}
    </div>
  )
}

export default SearchPage
