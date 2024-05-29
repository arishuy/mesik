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

const SearchPage = () => {
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
    fetchPlaylists()
  }, [])
  useEffect(() => {
    fetchData()
  }, [searchParams])

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
          <Grid item xs={12} md={6} key={song._id}>
            <SongCardVer2 song={song} allPlaylists={allPlaylists} />
          </Grid>
        ))}
      </Grid>
      <Typography variant='h4' py={3}>
        Bài hát có lời tương ứng
      </Typography>
      <Grid container spacing={2}>
        {data.song ? (
          <Grid item xs={12} md={6} key={data.song._id}>
            <SongCardVer2 song={data.song} allPlaylists={allPlaylists} />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Empty message={'Không có bài hát nào'} />
          </Grid>
        )}
      </Grid>
      <Typography variant='h4' py={3}>
        Nghệ sĩ
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
      <Typography variant='h4' py={3}>
        Album
      </Typography>
      <Grid container spacing={2}>
        {data.albums.length === 0 && (
          <Grid item xs={12}>
            <Empty message={'Không có album nào'} />
          </Grid>
        )}
        {data.albums.map((album) => (
          <Grid item xs={12} md={6} lg={3} key={album._id}>
            <div className='song-card'>
              <img className='song-card_image' src={album.photo_url} alt='David Bowie - Aladdin Sane' />
              <div className='song-card_play'>
                <Stack direction='row' spacing={1} pt={2}>
                  <Tooltip title='Phát ngay'>
                    <IconButton
                      onClick={(e) => {
                        handlePlayAlbum(album)
                      }}
                      color='success'
                    >
                      <PlayCircleFilledWhiteOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Chi tiết'>
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
                {album.songs.length} bài hát
              </div>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default SearchPage
