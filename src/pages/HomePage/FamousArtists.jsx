import React from 'react'
import { Card, Stack, Typography, Avatar } from '@mui/material'
import Axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { useEffect, useState } from 'react'

const FamousArtists = () => {
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
      <Stack direction='row' spacing={5}>
        {artists.map((artist) => (
          <Stack direction='column' alignItems='center' key={artist._id} px={3}>
            <Avatar alt='artist' src={artist.user.photo_url} sx={{ width: 200, height: 200 }} />
            <Typography variant='h6' padding={3}>
              {artist.user.first_name} {artist.user.last_name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </>
  )
}

export default FamousArtists
