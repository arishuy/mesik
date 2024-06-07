import PropTypes from 'prop-types'
import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
// components

// ----------------------------------------------------------------------

MusicTableToolbar.propTypes = {
  filterName: PropTypes.string,
  filterGenre: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterGenre: PropTypes.func,
  optionsGenre: PropTypes.arrayOf(PropTypes.string)
}

export default function MusicTableToolbar({ filterName, filterGenre, onFilterName, onFilterGenre, optionsGenre }) {
  const { t } = useTranslation()
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label={t('genre')}
        value={filterGenre}
        onChange={onFilterGenre}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } }
          }
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize'
        }}
      >
        {optionsGenre.map((option) => (
          <MenuItem
            key={option._id}
            value={option._id}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize'
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => {
          onFilterName(event.target.value)
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onFilterName(e.target.value, true)
          }
        }}
        placeholder={t('search')}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchOutlined />
            </InputAdornment>
          )
        }}
      />
    </Stack>
  )
}
