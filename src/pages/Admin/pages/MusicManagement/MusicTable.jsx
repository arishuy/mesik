import { useEffect, useState } from 'react'
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Avatar,
  Stack,
  Container,
  Chip
} from '@mui/material'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import moment from 'moment'
import DeleteConfirm from './DeleteConfirm'
import AddNewSong from './AddNewSong'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddLyric from './AddLyric'
import useSnack from '../../../../contexts/snackbar.context'
import EditSong from './EditSong'
import MusicTableToolbar from './MusicTableToolBar'
import svg from '../../../../assets/images/empty.png'

const MusicTable = ({
  majorsOrder,
  fetchData,
  genres,
  regions,
  filterName,
  filterGenre,
  handleFilterName,
  handleFilterGenre
}) => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const { snack, setSnack } = useSnack()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openAdd, setOpenAdd] = useState(false)
  const [openAddLyric, setOpenAddLyric] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const [id, setId] = useState('')
  const theme = useTheme()

  useEffect(() => {
    if (isMobile) {
      setRowsPerPage(5)
    }
  }, [isMobile])
  return (
    <>
      {openModal && (
        <EditSong
          open={openModal}
          handleClose={() => setOpenModal(false)}
          fetchData={fetchData}
          snack={snack}
          setSnack={setSnack}
          id={id}
          genres={genres}
          regions={regions}
        />
      )}
      {openAdd && (
        <AddNewSong
          open={openAdd}
          handleClose={() => setOpenAdd(false)}
          fetchData={fetchData}
          snack={snack}
          setSnack={setSnack}
          genres={genres}
          regions={regions}
        />
      )}
      {openAddLyric && (
        <AddLyric
          open={openAddLyric}
          handleClose={() => setOpenAddLyric(false)}
          fetchData={fetchData}
          id={id}
          snack={snack}
          setSnack={setSnack}
        />
      )}
      {openDelete && (
        <DeleteConfirm
          open={openDelete}
          setOpen={setOpenDelete}
          fetchData={fetchData}
          id={id}
          snack={snack}
          setSnack={setSnack}
        />
      )}

      <Card>
        <CardHeader
          title={t('songManagement')}
          action={
            <Box width={isMobile ? '' : 150}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => setOpenAdd(true)}
                fullWidth
                startIcon={<AddIcon />}
              >
                {isMobile ? '' : t('addNew')}
              </Button>
            </Box>
          }
        />
        <Divider />
        <TableContainer>
          <MusicTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
            filterGenre={filterGenre}
            onFilterGenre={handleFilterGenre}
            optionsGenre={[
              {
                _id: 'all',
                name: t('all')
              },
              ...genres.map((genre) => ({
                _id: genre._id,
                name: genre.name
              }))
            ]}
          />
          <Table size='small'>
            {majorsOrder.length > 0 ? (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>{t('title')}</TableCell>
                    <TableCell>{t('releaseDate')}</TableCell>
                    <TableCell>{t('duration')}</TableCell>
                    <TableCell>{t('artist')}</TableCell>
                    <TableCell align='right'>Premium</TableCell>
                    <TableCell align='right'>{t('hasLyrics')}</TableCell>
                    <TableCell align='right'>{t('time')}</TableCell>
                    <TableCell align='right'>{t('action')} </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? majorsOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : majorsOrder
                  ).map((majorsOrder, index) => {
                    return (
                      <TableRow hover key={majorsOrder._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Stack direction='row' spacing={2} alignItems='center'>
                            <Avatar src={majorsOrder.photo_url} />
                            <Stack direction='column' spacing={0}>
                              <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                                {majorsOrder.title}
                              </Typography>
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1' color='text.primary' fontWeight='bold' gutterBottom noWrap>
                            {moment(majorsOrder.release_date).format('DD/MM/YYYY')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                            {majorsOrder.duration}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                            {majorsOrder.artist.display_name}
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                            {majorsOrder.isPremium ? (
                              <Chip label='Yes' color='success' variant='outlined' />
                            ) : (
                              <Chip label='No' color='error' variant='outlined' />
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          {majorsOrder.lyric ? (
                            <Chip label='Yes' color='success' variant='outlined' />
                          ) : (
                            <Chip label='No' color='error' variant='outlined' />
                          )}
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                            {moment(majorsOrder.createdAt).format('DD/MM/YYYY')}
                          </Typography>
                          <Typography variant='body2' color='text.primary' gutterBottom noWrap>
                            {moment(majorsOrder.createdAt).format('h:mm:ss A')}
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Tooltip title={t('detailInfo')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.primary.lighter
                                },
                                color: theme.palette.primary.main
                              }}
                              onClick={() => {
                                setId(majorsOrder._id)
                                setOpenModal(true)
                              }}
                              color='inherit'
                              size='small'
                            >
                              <VisibilityTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('Edit lyric')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.warning.lighter
                                },
                                color: theme.palette.warning.main
                              }}
                              onClick={() => {
                                setId(majorsOrder._id)
                                setOpenAddLyric(true)
                              }}
                              color='inherit'
                              size='small'
                            >
                              <EditTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('delete')} arrow>
                            <IconButton
                              sx={{
                                '&:hover': { background: theme.palette.error.lighter },
                                color: theme.palette.error.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                setId(majorsOrder._id)
                                setOpenDelete(true)
                              }}
                            >
                              <DeleteTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </>
            ) : (
              <div style={{ width: '100%', textAlign: 'center' }}>
                <Container maxWidth='md'>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <img alt='404' height={200} src={svg} />
                    <Typography variant='h3' color='text.secondary' fontWeight='500' sx={{ mt: 2 }} gutterBottom>
                      {t('noResults')}
                    </Typography>
                  </Box>
                </Container>
              </div>
            )}
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default MusicTable
