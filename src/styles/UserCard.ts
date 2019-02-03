import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { red } from '@material-ui/core/colors';

export const styles = (theme: Theme) => ({
  card: {
    position: 'relative',
    margin: '0 0 15px 0',
    width: 300,
    height: 300,
  },
  media: {
    height: 100,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
})
