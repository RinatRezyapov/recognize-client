import * as React from 'react';

import { default as AvatarMaterial } from '@material-ui/core/Avatar';
import { Option, isNone } from 'fp-ts/lib/Option';
import { useI18n } from '../hooks/useI18n';
import { Id } from '../api/entities';
import { generateFileLink } from '../utils/converters';
import { grey } from '@material-ui/core/colors';

interface IProps {
  userName: Option<string>;
  userAvatar: Option<Id<File>>;
  size: 'small' | 'medium' | 'large';
  tooltipTitle: Option<string>;
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
  tooltipTitle,
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

  return (
    <>
      {
        isNone(userAvatar) ?
          <AvatarMaterial
            alt={userNameValue}
            src={userAvatarValue}
            style={getSize()}
            onClick={onClick}
          >
            U
          </AvatarMaterial> :
          <AvatarMaterial
            alt={userNameValue}
            src={userAvatarValue}
            style={getSize()}
            onClick={onClick}
          />
      }
    </>
  );
}

export default AvatarComponent;
