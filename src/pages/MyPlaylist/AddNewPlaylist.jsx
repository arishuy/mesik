import React, { useEffect, useState } from 'react'
import RootModal from '../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'
const AddNewPlaylist = ({ open, handleClose, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [newPlaylist, setNewPlaylist] = useState({
    title: ''
  })
  const handleAddNew = async () => {
    if (newPlaylist.title === '') {
      setSnack({
        ...snack,
        open: true,
        message: t('pleaseFillOutAllFields'),
        type: 'error'
      })
      return
    }
    await AxiosInterceptors.post(urlConfig.playlists.createPlaylist, newPlaylist)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('addNewMajorSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('addNewMajorFail'),
          type: 'error'
        })
      )
  }
  return (
    <>
      <Snackbar />
      <RootModal
        variant='Create'
        title='New Playlist'
        open={open}
        handleClose={handleClose}
        handleOk={() => {
          handleAddNew()
          handleClose()
        }}
        closeOnly={false}
      >
        <Stack spacing={2} direction='column' sx={{ width: '100%', my: 2 }}>
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            placeholder='Nhập tên playlist'
            fullWidth
            onChange={(e) =>
              setNewPlaylist({
                ...newPlaylist,
                title: e.target.value
              })
            }
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default AddNewPlaylist
