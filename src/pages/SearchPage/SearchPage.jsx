import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import urlConfig from '../../config/UrlConfig'
import { Avatar, Grid, Stack, Typography } from '@mui/material'
import Axios from 'axios'
import Empty from '../../common/components/Empty'
import Loading from '../../common/components/Loading/Loading'
import { Helmet } from 'react-helmet-async'
import SongCardVer2 from '../../common/components/SongCard_Ver2'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'

const SearchPage = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [allPlaylists, setAllPlaylists] = React.useState([])
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
    </div>
  )
}

export default SearchPage
