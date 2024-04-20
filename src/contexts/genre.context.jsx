// hooks
import { useState, useContext } from 'react'

// context
import { createContext } from 'react'

import AxiosInterceptors from '../common/utils/axiosInterceptors'
import urlConfig from '../config/UrlConfig'

async function getGenre() {
  return await AxiosInterceptors.get(urlConfig.genres.getAllGenres)
}

export const GenreContext = createContext()

export function GenreProvider({ children }) {
  const [genres, setGenres] = useState([])

  const getGenres = () => {
    getGenre()
      .then((res) => {
        setGenres(res.data.pagination.genres)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return <GenreContext.Provider value={{ genres, getGenres }}>{children}</GenreContext.Provider>
}
