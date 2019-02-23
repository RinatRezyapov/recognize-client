import { Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const styles = (theme: Theme) => ({
  media: {
    height: 100,
    width: 400,
    '&:hover': {
      opacity: 0.5,
    },
  },
})
