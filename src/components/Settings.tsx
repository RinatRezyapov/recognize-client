import * as React from 'react';
import SettingsForm from '../forms/SettingsForm';
import { useI18n } from '../hooks/useI18n';
import { Option } from 'fp-ts/lib/Option';
import { Id } from '../api/entities';
import { generateFileLink } from '../utils/converters';

interface IProps {
  userNameOpt: Option<string>;
  userAvatarOpt: Option<Id<File>>;
  userEmailOpt: Option<string>;
  userSignOut(): void;
}

const Settings = ({
  userNameOpt,
  userAvatarOpt,
  userEmailOpt,
}: IProps) => {

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
    <>
      <div style={{ flex: 2, padding: 15 }}>
        <SettingsForm
          onSubmit={onSaveSettings}
          initialValues={{
            username: userNameValue,
            email: userEmailValue,
            avatar: userAvatarValue,
          }}
        />
      </div>
    </>
  );
}

export default Settings;
