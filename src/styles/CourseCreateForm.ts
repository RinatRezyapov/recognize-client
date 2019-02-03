import { Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const styles = (theme: Theme) => ({
  media: {
    height: 100,
    border: '1px dashed '.concat(grey[500]),
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      opacity: 0.5,
    },
  },
})
