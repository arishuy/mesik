import React, { useContext, useEffect, useState } from 'react'
import { useMusicPlayer } from '../../contexts/music.context'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import dayjs from 'dayjs'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { Button, IconButton } from '@mui/material'
import { AppContext } from '../../contexts/app.context'
import { SnackbarContext } from '../../contexts/snackbar.context'
const MusicPlayer = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const isPremium = user?.premiumEndDate && dayjs(user.premiumEndDate) > dayjs()
  const { isAuthenticated, likedSong, setLikedSong } = useContext(AppContext)
  const { snack, setSnack } = useContext(SnackbarContext)
  const { currentSong } = useMusicPlayer()
  const [song, setSong] = useState({})
  const [audioLists, setAudioLists] = useState([
    {
      cover: 'https://res.cloudinary.com/dzeer2rgu/image/upload/v1713600642/olnnxkhdkwzpvlqalw8s.jpg',
      duration: 185.304,
      musicSrc: 'https://mesickaudio.s3.ap-southeast-2.amazonaws.com/N%C3%A2ng%20Ch%C3%A9n%20Ti%C3%AAu%20S%E1%BA%A7u',
      singer: 'Bích Phương',
      name: 'Nâng Chén Tiêu Sầu'
    }
  ])
  const playSong = async (id) => {
    if (!user) {
      return
    }
    await AxiosInterceptors.post(`${urlConfig.music.playSong}/play`, { id })
  }
  const handleLikeSong = async () => {
    // like song
    await AxiosInterceptors.get(urlConfig.user.likedSongs + `/${song.songId}`)
      .then((res) => {
        if (res.data.result.favourite === true) {
          setSnack({
            ...snack,
            open: true,
            message: 'Đã thêm vào thư viện',
            type: 'success'
          })
          setLikedSong((prevLikedSong) => [...prevLikedSong, song.songId])
          user.liked_songs.push(song.songId)
          localStorage.setItem('profile', JSON.stringify(user))
        } else {
          setSnack({
            ...snack,
            open: true,
            message: 'Đã xóa khỏi thư viện',
            type: 'success'
          })
          setLikedSong((prevLikedSong) => prevLikedSong.filter((item) => item !== song.songId))
          user.liked_songs = user.liked_songs.filter((item) => item !== song.songId)
          localStorage.setItem('profile', JSON.stringify(user))
        }
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Bài hát đã có trong thư viện',
          type: 'error'
        })
      })
  }
  useEffect(() => {
    setAudioLists(currentSong)
  }, [currentSong])
  return (
    <ReactJkMusicPlayer
      icon={{ reload: <FavoriteRoundedIcon /> }}
      quietUpdate
      clearPriorAudioLists
      autoPlayInitLoadPlayList
      showReload={false}
      showThemeSwitch={false}
      showDownload={isPremium ? true : false}
      mode='full'
      toggleMode={false}
      defaultPlayMode='orderLoop'
      audioLists={audioLists}
      onAudioPlay={(audioInfo) => {
        setSong(audioInfo)
        playSong(audioInfo.songId)
      }}
      extendsContent={
        isAuthenticated &&
        audioLists.length > 0 && (
          <IconButton onClick={() => handleLikeSong()} color={likedSong.includes(song.songId) ? 'success' : 'default'}>
            <FavoriteRoundedIcon />
          </IconButton>
        )
      }
    />
  )
}

export default MusicPlayer
