import { createContext, useState } from 'react'
import { getProfileFromLS } from '../utils/auth'
import { useCookies } from 'react-cookie'

export const getInitialAppContext = () => ({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  role: getProfileFromLS()?.role || 'USER',
  setRole: () => null,
  likedSong: getProfileFromLS()?.liked_songs || [],
  setLikedSong: () => null,
  reset: () => null
})

const initialAppContext = getInitialAppContext()

export const AppContext = createContext(initialAppContext)

export const AppProvider = ({ children, defaultValue = initialAppContext }) => {
  const [cookies, setCookie] = useCookies(['user'])
  const [isAuthenticated, setIsAuthenticated] = useState(cookies.access_token ? true : false)
  const [profile, setProfile] = useState(defaultValue.profile)
  const [role, setRole] = useState(defaultValue.role)
  const [likedSong, setLikedSong] = useState(defaultValue.likedSong)

  const reset = () => {
    setIsAuthenticated(false)
    setRole('USER')
    setProfile(null)
    setLikedSong([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        role,
        setRole,
        likedSong,
        setLikedSong,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
