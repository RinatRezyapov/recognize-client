import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column' as any,
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    alignItems: 'center',
  },
  menuButton: {

  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
  },
  leftToolBarGroup: {
    display: 'flex',
    flexDirection: 'row' as any,
    alignItems: 'center',
  },
  rightToolBarGroup: {
    display: 'flex',
    flexDirection: 'row' as any,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    cursor: 'pointer',
  },
  letterAvatar: {
    width: 40,
    height: 40,
    cursor: 'pointer',
  },
})
