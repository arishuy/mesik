import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import urlConfig from '../../config/UrlConfig'
import { useMusicPlayer } from '../../contexts/music.context'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Empty from '../../common/components/Empty'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const FamousAlbums = () => {
  const { t } = useTranslation()
  const [albums, setAlbums] = useState([])
  const navigate = useNavigate()
  const { playSong } = useMusicPlayer()
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.albums.getFamousAlbums)
      .then((res) => {
        setAlbums(res.data.albums)
        setIsLoading(false)
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
    fetchData()
  }, [])
  return (
    <>
      <Typography variant='h4' py={3}>
        {t('albumFeatured')}
      </Typography>
      <Grid container spacing={2}>
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
        {!isLoading && albums.length === 0 && (
          <Grid item xs={12}>
            <Empty message={t('Hãy nghe nhạc và tận hưởng âm nhạc cùng chúng tôi!')} />
          </Grid>
        )}
        {albums.map((album) => (
          <Grid item xs={12} md={6} lg={3} key={album._id}>
            <div
              className='song-card'
              onClick={(e) => {
                navigate(`/album/${album._id}`)
              }}
            >
              <img className='song-card_image' src={album.photo_url} alt='David Bowie - Aladdin Sane' />
              <div className='song-card_play'>
                <Stack direction='row' spacing={1} pt={2}>
                  <Tooltip title={t('Play Now')}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlayAlbum(album)
                      }}
                      color='success'
                    >
                      <PlayCircleFilledWhiteOutlinedIcon />
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
  )
}

export default FamousAlbums
