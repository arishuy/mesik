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
          <Grid item xs={2}>
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
                {artist.user.first_name} {artist.user.last_name}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default FamousArtists
