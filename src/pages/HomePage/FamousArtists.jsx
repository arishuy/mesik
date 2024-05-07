import React from 'react'
import { Stack, Typography, Avatar, Grid } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FamousArtists = () => {
  const navigate = useNavigate()
  const [artists, setArtists] = useState([])
  useEffect(() => {
    Axios.get(urlConfig.artists.get4Artist)
      .then((res) => {
        setArtists(res.data.artists)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <Typography variant='h4' py={3}>
        Nghệ sĩ nổi tiếng
      </Typography>
      <Grid container spacing={3}>
        {artists.map((artist) => (
          <Grid item xs={6} md={4} lg={2} key={artist._id}>
            <Stack
              direction='column'
              alignItems='center'
              justifyContent='center'
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
              <Avatar alt='artist' src={artist.user.photo_url} sx={{ width: 150, height: 150 }} />
              <Typography variant='h6' p={2} textAlign='center'>
                {artist.display_name}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default FamousArtists
