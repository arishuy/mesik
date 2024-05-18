import React, { createContext, useState, useContext } from 'react'
import { AppContext } from './app.context'
import dayjs from 'dayjs'

const MusicPlayerContext = createContext()

export const useMusicPlayer = () => {
  return useContext(MusicPlayerContext)
}

export const MusicPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState([])
  const { profile } = useContext(AppContext)
  const isPremium = profile?.premiumEndDate && dayjs(profile.premiumEndDate) > dayjs()
  const addToPlaylist = (song) => {
    let mappToReactJkMusicPlayerAudioInfo
    if (song.isPremium && !isPremium) {
      mappToReactJkMusicPlayerAudioInfo = {
        cover: song.photo_url,
        duration: song.duration,
        musicSrc: 'https://mesikaudio.s3.ap-southeast-1.amazonaws.com/quangcao.mp3',
        name: song.title,
        singer: song.artist.display_name,
        songId: song._id
      }
    } else
      mappToReactJkMusicPlayerAudioInfo = {
        cover: song.photo_url,
        duration: song.duration,
        musicSrc: song.file,
        name: song.title,
        singer: song.artist.display_name,
        songId: song._id
      }
    setCurrentSong((prev) => [...prev, mappToReactJkMusicPlayerAudioInfo])
  }

  const playSong = (song) => {
    let mappToReactJkMusicPlayerAudioInfo = song.map((song) => {
      if (song.isPremium && !isPremium) {
        return {
          cover: song.photo_url,
          duration: song.duration,
          musicSrc: 'https://mesikaudio.s3.ap-southeast-1.amazonaws.com/quangcao.mp3',
          name: song.title,
          singer: song.artist.display_name,
          songId: song._id
        }
      }
      return {
        cover: song.photo_url,
        duration: song.duration,
        musicSrc: song.file,
        name: song.title,
        singer: song.artist.display_name,
        songId: song._id
      }
    })
    setCurrentSong(mappToReactJkMusicPlayerAudioInfo)
  }

  return (
    <MusicPlayerContext.Provider value={{ currentSong, playSong, addToPlaylist }}>
      {children}
    </MusicPlayerContext.Provider>
  )
}
