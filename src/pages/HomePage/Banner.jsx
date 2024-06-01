import React, { useState } from 'react'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import { Card, IconButton, Skeleton, Stack } from '@mui/material'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded'
import { useNavigate } from 'react-router-dom'
const Carousel = () => {
  const [sections, setSections] = useState([])
  const [visibleItems, setVisibleItems] = useState([])
  const [isHover, setIsHover] = React.useState(false)
  const navigate = useNavigate()

  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.sections.getBannerSection)
      .then((res) => {
        setSections(res.data.sections[0])
        setVisibleItems(res.data.sections[0].items.slice(0, 3)) // Lấy 3 phần tử đầu tiên để hiển thị
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleNext = () => {
    if (sections.length === 0) return

    setVisibleItems((prevItems) => {
      const lastIndex = sections.items.indexOf(prevItems[prevItems.length - 1])
      const nextIndex = (lastIndex + 1) % sections.items.length
      return [...prevItems.slice(1), sections.items[nextIndex]]
    })
  }

  const handlePrev = () => {
    if (sections.length === 0) return

    setVisibleItems((prevItems) => {
      const firstIndex = sections.items.indexOf(prevItems[0])
      const prevIndex = (firstIndex - 1 + sections.items.length) % sections.items.length
      return [sections.items[prevIndex], ...prevItems.slice(0, -1)]
    })
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Stack direction='row' spacing={3}>
        {visibleItems.length === 0 && (
          <Skeleton
            variant='rounded'
            height={200}
            animation='wave'
            sx={{
              width: '100%'
            }}
          />
        )}
        {visibleItems.map((item, index) => (
          <Card
            key={item._id}
            onClick={() => {
              navigate(`/album/${item._id}`)
            }}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <img src={item.photo_url} alt='album' />
          </Card>
        ))}
      </Stack>
      {isHover && (
        <>
          <IconButton
            onClick={handlePrev}
            size='large'
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <NavigateBeforeRoundedIcon
              sx={{
                color: 'white'
              }}
            />
          </IconButton>
          <IconButton
            onClick={handleNext}
            size='large'
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <NavigateNextRoundedIcon
              sx={{
                color: 'white'
              }}
            />
          </IconButton>
        </>
      )}
    </div>
  )
}

export default Carousel
