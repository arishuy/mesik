//
import Card from './Card'
import Paper from './Paper'
import Input from './Input'
import Table from './Table'
import ListItemButton from './ListItemButton'
import Tooltip from './Tooltip'
import Backdrop from './Backdrop'
import Typography from './Typography'
import Autocomplete from './Autocomplete'
import Button from './Button'
import TextField from './TextField'
import Progress from './Progress'

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    Table(theme),
    Input(theme),
    Paper(),
    ListItemButton(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    Autocomplete(theme),
    Button(theme),
    TextField(theme),
    Progress(theme)
  )
}
