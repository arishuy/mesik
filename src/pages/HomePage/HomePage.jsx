import React, { useContext, useEffect } from 'react'
import { Card, Grid, Stack, Typography } from '@mui/material'
import JustReleased from './JustReleased'
import FamousArtists from './FamousArtists'
import RandomSong from './RandomSong'
import RecentListen from './RecentListen'
import { Helmet } from 'react-helmet-async'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import Snackbar from '../../common/components/SnackBar'
import { AppContext } from '../../contexts/app.context'
import SuggestedPlaylist from './SuggestedPlaylist'
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
      <Snackbar />
      <Helmet>
        <title>Trang Chủ</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {isAuthenticated && <SuggestedPlaylist />}
          <RandomSong allPlaylists={allPlaylists} />
          {isAuthenticated && <RecentListen allPlaylists={allPlaylists} />}
          <JustReleased allPlaylists={allPlaylists} />
          <FamousArtists />
        </Grid>
      </Grid>
    </div>
  )
}

export default HomePage
