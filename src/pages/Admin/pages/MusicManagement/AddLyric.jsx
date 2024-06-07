import React, { useEffect, useState, useContext, useRef } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField, MenuItem, Button, Typography } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useTranslation } from 'react-i18next'

const AddLyric = ({ open, handleClose, id, fetchData, snack, setSnack }) => {
  const { t } = useTranslation()
  const [lyric, setLyric] = useState('')

  const fetchLyric = async () => {
    await AxiosInterceptors.get(`${urlConfig.music.getLyricFromSong}/${id}`)
      .then((res) => {
        setLyric(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const addLyric = async () => {
    await AxiosInterceptors.post(`${urlConfig.music.addLyricToSong}/${id}`, { lyric: lyric })
      .then((res) => {
        fetchData()
        setSnack({ open: true, message: t('updateSuccess'), status: 'success' })
      })
      .catch((err) => {
        setSnack({ open: true, message: t('updateFail'), status: 'error' })
      })
  }
  useEffect(() => {
    if (id) {
      fetchLyric()
    }
  }, [id])
  return (
    <>
      <RootModal
        variant='Edit'
        title={t('Edit lyric')}
        open={open}
        handleClose={handleClose}
        handleOk={() => {
          addLyric()
          handleClose()
        }}
        closeOnly={false}
      >
        <Stack spacing={2} direction='column' sx={{ width: '100%', my: 2 }}>
          <TextField
            fullWidth
            label={t('lyric')}
            multiline
            rows={6}
            onChange={(e) => setLyric(e.target.value)}
            value={lyric}
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default AddLyric
