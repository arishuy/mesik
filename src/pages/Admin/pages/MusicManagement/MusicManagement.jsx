import React, { useContext, useState } from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import MusicTable from './MusicTable'
import { Box, Pagination, Container, Typography } from '@mui/material'
import Loading from '../../../../common/components/Loading/Loading'
import svg from '../../../../assets/images/empty.png'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import { GenreContext } from '../../../../contexts/genre.context'
import { RegionContext } from '../../../../contexts/region.context'
const MusicManagement = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [music, setMusic] = React.useState([])
  const [pageCount, setPageCount] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [totalPages, setTotalPages] = React.useState(0)
  const { genres, getGenres } = useContext(GenreContext)
  const { regions, getRegions } = useContext(RegionContext)
  const [filterName, setFilterName] = useState('')
  const [filterGenre, setFilterGenre] = useState('all')
  const fetchData = async () => {
    await AxiosInterceptors.get(
      urlConfig.music.getAllMusic + `?limit=10&page=${pageCount}&name=${filterName}&genre=${filterGenre}`
    )
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.songs) {
            setMusic(res.data.pagination.songs)
            setTotalPages(res.data.pagination.totalPages)
            setIsLoading(false)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  const handleFilterName = (filterName, fetch = false) => {
    setFilterName(filterName)
    if (fetch) {
      setIsLoading(true)
      fetchData()
      setPageCount(1)
    }
  }

  const handleFilterGenre = (event) => {
    setFilterGenre(event.target.value)
    setPageCount(1)
  }
  React.useEffect(() => {
    getGenres()
    getRegions()
  }, [])
  React.useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [pageCount, filterGenre])
  return (
    <div
      style={
        isMobile
          ? { width: '100%', padding: '20px 20px', maxHeight: '93vh', overflow: 'auto' }
          : { width: '100%', padding: '20px 100px', maxHeight: '93vh', overflow: 'auto' }
      }
    >
      <Helmet>
        <title>{t('songManagement')}</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MusicTable
            majorsOrder={music}
            fetchData={fetchData}
            pageCount={pageCount}
            setPageCount={setPageCount}
            genres={genres}
            regions={regions}
            filterName={filterName}
            filterGenre={filterGenre}
            handleFilterName={handleFilterName}
            handleFilterGenre={handleFilterGenre}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Pagination
              count={totalPages}
              color='primary'
              page={pageCount}
              onChange={(e, value) => setPageCount(value)}
              sx={{
                p: 2,
                mb: isMobile ? 5 : 0
              }}
            />
          </Box>
        </>
      )}
    </div>
  )
}

export default MusicManagement
