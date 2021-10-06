import * as React from "react";
import { none, Option, fromNullable } from "fp-ts/lib/Option";
import { History } from "history";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { Id } from "../../api/entities";

import Settings from "../Settings";
import AvatarComponent from "../AvatarComponent";
import LanguageSelector from "../LanguageSelector";
import LinkButton from "../LinkButton";

import { useI18n } from "../../hooks/useI18n";
import { useMaterialPopover } from "../../hooks/useMaterialPopover";
import { useMaterialDialog } from "../../hooks/useMaterialDialog";

import "./AppHeader.scss";
import styled from "@emotion/styled";

interface IProps {
  history: History;
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  userEmailOpt: Option<string>;
  userSignOut(): void;
}

const AppHeader: React.FunctionComponent<IProps> = ({
  history,
  userNameOpt,
  userAvatarOpt,
  userEmailOpt,
  userSignOut,
}) => {
  const { t } = useI18n();
  const { openDialog, closeDialog, renderDialog } = useMaterialDialog();
  const { openPopover, closePopover, renderPopover } = useMaterialPopover();

  const onProfileClick = () => history.push("/profile");

  const onSettingsClick = () => {
    openDialog(
      t("Settings"),
      <Settings
        userNameOpt={userNameOpt}
        userAvatarOpt={userAvatarOpt}
        userEmailOpt={userEmailOpt}
        userSignOut={userSignOut}
      />,
      []
    );
    closePopover();
  };

  const onLogOutClick = () => userSignOut();

  const handleAvatarClick = (evt: any) => {
    openPopover(
      fromNullable(evt.currentTarget),
      fromNullable(
        <List>
          {[
            {
              icon: <AccountCircleIcon />,
              text: "My profile",
              onClick: onProfileClick,
            },
            {
              icon: <SettingsIcon />,
              text: "Settings",
              onClick: onSettingsClick,
            },
            {
              icon: <ExitToAppIcon />,
              text: "Log out",
              onClick: onLogOutClick,
            },
          ].map((item) => (
            <ListItem button={true} key={item.text} onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      ),
      none,
      none
    );
  };

  const renderMainAppBar = () => (
    <AppBar position="static" className="AppHeader__main-app-bar">
      <Toolbar className="AppHeader__tool-bar">
        <div className="AppHeader__left-tool-bar-group">
          <RemoveRedEyeOutlinedIcon />
          <RecognizeLogo variant="h6" color="inherit">
            Recognize
          </RecognizeLogo>
        </div>
        <MenuItemsContainer>
          <LinkButton to="/profile" variant="text" type='light'>
            {t("Profile")}
          </LinkButton>
          <LinkButton to="/courses" variant="text" type='light'>
            {t("Courses")}
          </LinkButton>
          <LinkButton to="/users" variant="text" type='light'>
            {t("Users")}
          </LinkButton>
        </MenuItemsContainer>
        <div className="AppHeader__right-tool-bar-group">
          <AvatarComponent
            userAvatar={userAvatarOpt}
            userName={userNameOpt}
            size={"small"}
            title={none}
            onClick={handleAvatarClick}
          />
          <div className="AppHeader__language-selector-container">
            <LanguageSelector />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );

  const renderSecondAppBar = () => (
    <AppBar position="static" color="default">
      <Toolbar variant="dense" className="AppHeader__second-tool-bar">
        <LinkButton color="primary" to="/profile" variant="text">
          {t("Profile")}
        </LinkButton>
        <LinkButton color="primary" to="/courses" variant="text">
          {t("Courses")}
        </LinkButton>
        <LinkButton color="primary" to="/users" variant="text">
          {t("Users")}
        </LinkButton>
      </Toolbar>
    </AppBar>
  );

  return (
    <div className="AppHeader__root-container">
      <CssBaseline />
      {renderMainAppBar()}
      {renderPopover()}
      {renderDialog()}
    </div>
  );
};

export default AppHeader;

const RecognizeLogo = styled(Typography)`
  color: white;
  font-weight: 600;
`;

const MenuItemsContainer = styled.div`
  a:not(:last-child) {
    margin-right: 1rem;
  }
`;