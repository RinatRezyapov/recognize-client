import * as React from 'react';

import TextField from '@mui/material/TextField';
import { withStyles, WithStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useI18n } from '../../hooks/useI18n';

import './CourseViewerDrawer.scss';

const drawerWidth = 300;

const styles = ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
});

interface IProps {
  drawerOpen: boolean;
  intervalMs: number;
  wordsCount: number;
  handleDrawerClose: () => void;
  onIntervalMsChange: (value: number) => void;
  onWordsCountChange: (value: number) => void;
}

const CourseViewerDrawer: React.FunctionComponent<IProps & WithStyles<any>> = ({
  drawerOpen,
  classes,
  intervalMs,
  wordsCount,
  handleDrawerClose,
  onIntervalMsChange,
  onWordsCountChange,
}) => {

  const { t } = useI18n();

  const handleIntervalMsChange = (e: any) => {
    onIntervalMsChange(parseInt(e.target.value, 10));
  }

  const handleWordsCountChange = (e: any) => {
    onWordsCountChange(parseInt(e.target.value, 10));
  }

  return (
    <Drawer
      className='CourseViewerDrawer__drawer'
      variant='persistent'
      anchor='right'
      open={drawerOpen}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className='CourseViewerDrawer__drawer-container'>
        <div className='CourseViewerDrawer__drawer-close-button'>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <div className='CourseViewerDrawer__drawer-settings'>
          <TextField
            type='number'
            className='CourseViewerDrawer__text-field'
            label={t('Interval (ms)')}
            variant='outlined'
            value={intervalMs}
            onChange={handleIntervalMsChange}
          />
          <TextField
            type='number'
            className='CourseViewerDrawer__text-field'
            label={t('Words count')}
            variant='outlined'
            value={wordsCount}
            onChange={handleWordsCountChange}
          />
        </div>
      </div>
    </Drawer>
  );
}

export default withStyles(styles)(CourseViewerDrawer);
