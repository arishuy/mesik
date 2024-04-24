import React from 'react'
import { Card, Grid, Stack, Typography, Box, Avatar } from '@mui/material'
import JustReleased from './JustReleased'
import FamousArtists from './FamousArtists'
import RandomSong from './RandomSong'
import RecentListen from './RecentListen'

const HomePage = () => {
  return (
    <div
      style={{
        padding: '20px 100px'
      }}
    >
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
              <img src='https://photo-zmp3.zmdcdn.me/banner/8/1/1/0/8110bbecd7d2a358364047fea6be1e03.jpg' alt='album' />
            </Card>
          </Stack>
          <Typography variant='h4' py={3}>
            Playlist cho bạn
          </Typography>
          <Card sx={{ padding: '20px' }}>
            <img src='https://via.placeholder.com/200' alt='album' />
          </Card>
          <RandomSong />
          <RecentListen />
          <JustReleased />
          <FamousArtists />
        </Grid>
      </Grid>
    </div>
  )
}

export default HomePage
