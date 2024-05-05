import React, { useEffect, useState } from 'react'
import { useMusicPlayer } from '../../contexts/music.context'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'

const MusicPlayer = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const { currentSong } = useMusicPlayer()
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
  useEffect(() => {
    setAudioLists(currentSong)
  }, [currentSong])
  return (
    <ReactJkMusicPlayer
      clearPriorAudioLists
      autoPlayInitLoadPlayList
      showDownload={false}
      mode='full'
      toggleMode={false}
      defaultPlayMode='orderLoop'
      audioLists={audioLists}
      onAudioPlay={(audioInfo) => {
        playSong(audioInfo.songId)
      }}
    />
  )
}

export default MusicPlayer
