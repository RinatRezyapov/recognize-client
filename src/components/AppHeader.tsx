import * as React from 'react';
import { none, Option, fromNullable, some } from 'fp-ts/lib/Option';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Id } from '../api/entities';

import Settings from './Settings';
import AvatarComponent from './AvatarComponent';
import LanguageSelector from './LanguageSelector';
import LinkButton from './LinkButton';

import { useI18n } from '../hooks/useI18n';
import { useMaterialPopover } from '../hooks/useMaterialPopover';
import { useMaterialDialog } from '../hooks/useMaterialDialog';

import { styles } from './AppHeaderStyles';

interface IProps {
  history: any;
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  userEmailOpt: Option<string>;
  userSignOut(): void;
};

const AppHeader = ({
  history,
  classes,
  userNameOpt,
  userAvatarOpt,
  userEmailOpt,
  userSignOut,
}: IProps & WithStyles) => {

  const { t } = useI18n();
  const { openDialog, closeDialog, renderDialog } = useMaterialDialog();
  const { openPopover, closePopover, renderPopover } = useMaterialPopover();

  const onProfileClick = () => history.push('/profile');

  const onSettingsClick = () => {
    openDialog(
      t('Settings'),
      (
        <Settings
          userNameOpt={userNameOpt}
          userAvatarOpt={userAvatarOpt}
          userEmailOpt={userEmailOpt}
          userSignOut={userSignOut}
        />
      ),
      [],
    )
    closePopover();
  };

  const onLogOutClick = () => userSignOut();

  const handleAvatarClick = (evt: any) => {
    openPopover(
      fromNullable(evt.currentTarget),
      fromNullable(
        <div>
          <div className={classes.toolbar} />
          <List>
            {
              [
                { icon: <AccountCircleIcon />, text: 'My profile', onClick: onProfileClick },
                { icon: <SettingsIcon />, text: 'Settings', onClick: onSettingsClick },
                { icon: <ExitToAppIcon />, text: 'Log out', onClick: onLogOutClick },
              ].map(item => (
                <ListItem button={true} key={item.text} onClick={item.onClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))
            }
          </List>
        </div>,
      ),
      none,
      none,
    )
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='static' className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.leftToolBarGroup}>
            <Typography variant='h6' color='inherit'>
              Recognize
            </Typography>
          </div>

          <div className={classes.rightToolBarGroup}>
            <AvatarComponent
              userAvatar={userAvatarOpt}
              userName={userNameOpt}
              size={'small'}
              title={none}
              onClick={handleAvatarClick}
            />
            <div style={{ margin: '0 0 0 15px' }}><LanguageSelector /></div>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position='static' color='default'>
        <Toolbar variant='dense' style={{ justifyContent: 'center' }}>
          <LinkButton color='primary' path='/profile' variant='text'>
            {t('Profile')}
          </LinkButton>
          <LinkButton color='primary' path='/courses' variant='text'>
            {t('Courses')}
          </LinkButton>
          <LinkButton color='primary' path='/users' variant='text'>
            {t('Users')}
          </LinkButton>
        </Toolbar>
      </AppBar>
      {renderPopover()}
      {renderDialog()}
    </div>
  );

}

export default withStyles(styles)(AppHeader)
