import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const styles = (theme: Theme) => ({
  media: {
    height: 100,
    width: 400,
    '&:hover': {
      opacity: 0.5,
    },
  },
})
