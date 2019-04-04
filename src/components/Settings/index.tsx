import * as React from 'react';
import { Option } from 'fp-ts/lib/Option';

import { Id } from '../../api/entities';

import SettingsForm from '../../forms/SettingsForm';
import { useI18n } from '../../hooks/useI18n';

import { generateFileLink } from '../../utils/converters';

import './Settings.scss';

interface IProps {
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  userEmailOpt: Option<string>;
  userSignOut(): void;
}

const Settings: React.FunctionComponent<IProps> = ({
  userNameOpt,
  userAvatarOpt,
  userEmailOpt,
}) => {

  const { t } = useI18n();

  const onSaveSettings = () => {
    return ''
  }

  const userNameValue = userNameOpt.getOrElse(t('Unknown user'));
  const userEmailValue = userEmailOpt.getOrElse(t('Unknown email'));
  const userAvatarValue = userAvatarOpt
    .map(v => generateFileLink(v))
    .getOrElse('');

  return (
    <div className='Settings__container'>
      <SettingsForm
        onSubmit={onSaveSettings}
        initialValues={{
          username: userNameValue,
          email: userEmailValue,
          avatar: userAvatarValue,
        }}
      />
    </div>
  );
}

export default Settings;
