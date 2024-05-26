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
          <Stack direction='row' spacing={3}>
            <Card>
              <img src='https://photo-zmp3.zmdcdn.me/banner/8/1/1/0/8110bbecd7d2a358364047fea6be1e03.jpg' alt='album' />
            </Card>
            <Card>
              <img src='https://photo-zmp3.zmdcdn.me/banner/5/3/c/7/53c750801ec118ba599c0f8e12f76ba0.jpg' alt='album' />
            </Card>
            <Card>
              <img src='https://photo-zmp3.zmdcdn.me/banner/1/e/d/4/1ed445615d7119557c913c2c2cb31b2e.jpg' alt='album' />
            </Card>
          </Stack>
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
