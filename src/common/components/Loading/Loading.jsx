import React from 'react'
import './style.css'
import { Box } from '@mui/material'

const Loading = () => {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999
        }}
      >
        <div className='loader'></div>
      </Box>
    </>
  )
}
export default Loading
