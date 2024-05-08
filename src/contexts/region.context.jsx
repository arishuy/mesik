// hooks
import { useState, useContext } from 'react'

// context
import { createContext } from 'react'

import AxiosInterceptors from '../common/utils/axiosInterceptors'
import urlConfig from '../config/UrlConfig'

async function getRegion() {
  return await AxiosInterceptors.get(urlConfig.regions.getAllRegions)
}

export const RegionContext = createContext()

export function RegionProvider({ children }) {
  const [regions, setRegions] = useState([])

  const getRegions = () => {
    getRegion()
      .then((res) => {
        setRegions(res.data.pagination.regions)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return <RegionContext.Provider value={{ regions, getRegions }}>{children}</RegionContext.Provider>
}
