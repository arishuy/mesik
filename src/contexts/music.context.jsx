import React, { createContext, useState, useContext } from 'react'

const MusicPlayerContext = createContext()

export const useMusicPlayer = () => {
  return useContext(MusicPlayerContext)
}

export const MusicPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState([])

  const playSong = (song) => {
    let mappToReactJkMusicPlayerAudioInfo = song.map((song) => {
      return {
        cover: song.photo_url,
        duration: song.duration,
        musicSrc: song.file,
        name: song.title,
        singer: song.artist.user.first_name + ' ' + song.artist.user.last_name
      }
    })
    setCurrentSong(mappToReactJkMusicPlayerAudioInfo)
  }

  return <MusicPlayerContext.Provider value={{ currentSong, playSong }}>{children}</MusicPlayerContext.Provider>
}
