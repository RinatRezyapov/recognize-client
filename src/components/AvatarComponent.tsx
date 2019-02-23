import * as React from 'react';
import { Option, isNone } from 'fp-ts/lib/Option';
import Tooltip from '@material-ui/core/Tooltip';
import { default as AvatarMaterial } from '@material-ui/core/Avatar';
import { Id } from '../api/entities';
import { useI18n } from '../hooks/useI18n';
import { generateFileLink } from '../utils/converters';

interface IProps {
  userName: Option<string>;
  userAvatar: Option<Id<File>>;
  title: Option<string>;
  size: 'small' | 'medium' | 'large';
  onClick: (evt: any) => void;
}

const small = {
  width: 40,
  height: 40,
  cursor: 'pointer',
  border: '2px solid white',
  backgroundColor: 'white',
}

const medium = {
  width: 70,
  height: 70,
  cursor: 'pointer',
  border: '3px solid white',
  backgroundColor: 'white',
}

const large = {
  width: 200,
  height: 200,
  cursor: 'pointer',
  border: '3px solid white',
  backgroundColor: 'white',
}

const AvatarComponent = ({
  userName,
  userAvatar,
  onClick,
  size,
  title
}: IProps) => {

  const { t } = useI18n();

  const userNameValue = userName.getOrElse('userName is undefined');
  const userAvatarValue = userAvatar
    .map(v => generateFileLink(v))
    .getOrElse(require('../assets/defaultProfile.png'));

  const getSize = () => {
    switch (size) {
      case 'small':
        return small;
      case 'medium':
        return medium;
      case 'large':
        return large;
      default:
        return small;

    }
  }

  const renderAvatar = () => {
    return <AvatarMaterial
      alt={userNameValue}
      src={userAvatarValue}
      style={getSize()}
      onClick={onClick}
    />
  }

  const wrapToTooltip = (element: React.ReactElement<any>) => {
    return <Tooltip title={t('Upload new image')}>
      {element}
    </Tooltip>
  }

  return isNone(title) ? renderAvatar() : wrapToTooltip(renderAvatar())
}

export default AvatarComponent;
