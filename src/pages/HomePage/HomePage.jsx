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
const HomePage = () => {
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
    <div
      style={{
        padding: '20px 100px'
      }}
    >
      <Helmet>
        <title>Trang Chủ</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Carousel />
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
