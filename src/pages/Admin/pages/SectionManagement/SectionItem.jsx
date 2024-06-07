import React from 'react'
import { Grid, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import EditSection from './EditSection'
import DeleteConfirm from './DeleteConfirm'

const SectionItem = ({ section, fetchData }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)

  return (
    <div>
      {openEdit && (
        <EditSection
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          section_data={section}
          fetchData={fetchData}
        />
      )}
      {openDelete && <DeleteConfirm open={openDelete} setOpen={setOpenDelete} id={section._id} fetchData={fetchData} />}
      <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center' py={2}>
        <Typography
          variant='h4'
          py={2}
          color={section.type === 'banner' ? theme.palette.error.main : theme.palette.primary.main}
        >
          {section.type === 'banner' ? t('Banner Hiển Thị Ở Đầu Trang Chủ') : section.name}
        </Typography>
        <Stack direction='row' spacing={1}>
          <Tooltip title={t('edit')} arrow>
            <IconButton
              sx={{
                '&:hover': {
                  background: theme.palette.warning.lighter
                },
                color: theme.palette.warning.main
              }}
              onClick={() => {
                setOpenEdit(true)
              }}
              color='inherit'
              size='small'
            >
              <EditTwoToneIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {section.type !== 'banner' && (
            <Tooltip title={t('delete')} arrow>
              <IconButton
                sx={{
                  '&:hover': { background: theme.palette.error.lighter },
                  color: theme.palette.error.main
                }}
                color='inherit'
                size='small'
                onClick={() => {
                  setOpenDelete(true)
                }}
              >
                <DeleteTwoToneIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>
      <Grid container spacing={2}>
        {section.items.map((playlist) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            key={playlist._id}
            onClick={() => navigate(`/admin/edit-album/${playlist._id}`)}
          >
            <div className='song-card'>
              <img className='song-card_image' src={playlist.photo_url} alt='David Bowie - Aladdin Sane' />
              <div className='song-card_info'>
                <div className='song-card_info_artist'>{playlist.songs.length} bài hát</div>
                <div className='song-card_info_album'></div>
                <div className='song-card_info_title'>{playlist.title}</div>
              </div>
              <div className='song-card_play'></div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default SectionItem
