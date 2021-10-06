import * as React from 'react';
import { Option, isNone } from 'fp-ts/lib/Option';

import Tooltip from '@mui/material/Tooltip';
import { default as AvatarMaterial } from '@mui/material/Avatar';

import { Id } from '../../api/entities';

import { useI18n } from '../../hooks/useI18n';

import { generateFileLink } from '../../utils/converters';
import { UNDEFINED_MESSAGE } from '../../utils/constants';

import './AvatarComponent.scss';

interface IProps {
  userName: Option<string>;
  userAvatar: Option<Id<File>>;
  title: Option<string>;
  size: 'small' | 'medium' | 'large';
  onClick: (evt: any) => void;
}

const AvatarComponent: React.FunctionComponent<IProps> = ({
  userName,
  userAvatar,
  onClick,
  size,
  title
}) => {

  const { t } = useI18n();

  const userNameValue = userName.getOrElse(t(UNDEFINED_MESSAGE));
  const userAvatarValue = userAvatar
    .map(v => generateFileLink(v))
    .getOrElse(require('../../assets/defaultProfile.png'));

  const getSize = () => {
    switch (size) {
      case 'small':
        return 'AvatarComponent__small';
      case 'medium':
        return 'AvatarComponent__medium';
      case 'large':
        return 'AvatarComponent__large';
      default:
        return 'AvatarComponent__small';
    }
  }

  const renderAvatar = () => (
    <AvatarMaterial
      alt={userNameValue}
      src={userAvatarValue}
      className={getSize()}
      onClick={onClick}
    />
  )

  const wrapToTooltip = (element: React.ReactElement<any>) => (
    <Tooltip title={t('Upload new image')}>
      {element}
    </Tooltip>
  )

  return isNone(title) ? renderAvatar() : wrapToTooltip(renderAvatar())
}

export default AvatarComponent;
