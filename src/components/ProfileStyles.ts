import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) => ({
  userNameTypography: {
    width: 200,
    overflow: 'hidden',
    textAlign: 'center',
    textOverflow: 'ellipsis',
  },
  leftPanelPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
  },
  container: {
    display: 'flex', 
    margin: '0px auto 0px auto', 
    padding: '15px 0 0 0',
  },
  leftPanelContainer: {
    width: 250
  },
  rightPanelContainer: {
    width: 400, 
    margin: '0px 10px'
  }
})

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  margin: `0 0 8px 0`,
  background: isDragging ? 'lightgreen' : 'transparent',
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'transparent',
});