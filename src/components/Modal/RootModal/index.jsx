import { Modal, Box, Typography, Button } from '@mui/material'
import { theme } from '../../../theme'
import useResponsive from '../../../hooks/useResponsive'
import { Close, Done } from '@mui/icons-material'

const RootModal = ({ title, variant, open, handleClose, handleOk, children, closeOnly, width }) => {
  const isMobile = useResponsive('down', 'sm')

  const colors = {
    Create: theme.palette.primary,
    Edit: theme.palette.info,
    Delete: theme.palette.error,
    Info: theme.palette.info
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '80vw' : width ? width : 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: isMobile ? 3 : 4
        }}
      >
        <Typography id='modal-modal-title' variant='h4' component='h2'>
          {title ? title : variant}
        </Typography>
        <div>{children}</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 24
          }}
        >
          {!closeOnly && (
            <Button variant='text' color='error' onClick={handleClose}>
              {isMobile ? <Close sx={{ color: 'red' }} /> : 'Cancel'}
            </Button>
          )}
          <Button variant='text' color='primary' onClick={handleOk} sx={{ ml: 2 }}>
            {isMobile ? <Done sx={{ color: 'white' }} /> : closeOnly ? 'Close' : 'Ok'}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default RootModal
