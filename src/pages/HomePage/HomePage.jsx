import React, { useContext, useEffect } from 'react'
import { Card, Grid, Stack, Typography } from '@mui/material'
import JustReleased from './JustReleased'
import FamousArtists from './FamousArtists'
import RandomSong from './RandomSong'
import RecentListen from './RecentListen'
import { Helmet } from 'react-helmet-async'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import { AppContext } from '../../contexts/app.context'
import SuggestedPlaylist from './SuggestedPlaylist'
import FamousAlbums from './FamousAlbums'
import HomeSection from './HomeSection'
import Carousel from './Banner'
import useResponsive from '../../hooks/useResponsive'
import { useTranslation } from 'react-i18next'
import News from './News'
const HomePage = () => {
  const { t } = useTranslation()
  const isMobile = useResponsive('down', 'sm')
  const { isAuthenticated } = useContext(AppContext)
  const [allPlaylists, setAllPlaylists] = React.useState([])

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.playlists.getAllPlaylistsByUser)
      .then((res) => {
        setAllPlaylists(res.data.playlists)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (isAuthenticated) fetchData()
  }, [])
  return (
    <div style={isMobile ? { width: '100%', padding: '20px 20px' } : { width: '100%', padding: '20px 100px' }}>
      <Helmet>
        <title>{t('homepage')}</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Carousel />
          <News />
          <RandomSong allPlaylists={allPlaylists} />
          {isAuthenticated && <RecentListen allPlaylists={allPlaylists} />}
          {isAuthenticated && <SuggestedPlaylist />}
          <JustReleased allPlaylists={allPlaylists} />
          <FamousAlbums />
          <HomeSection />
          <FamousArtists />
        </Grid>
      </Grid>
    </div>
  )
}

export default HomePage
