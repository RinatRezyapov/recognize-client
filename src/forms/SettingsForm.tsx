import * as React from 'react';
import {
  reduxForm,
  InjectedFormProps,
  Field
} from 'redux-form';

import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';

import { useI18n } from '../hooks/useI18n';

interface IProps {
  handleSubmit: () => void;
}

const renderTextField = (props: any) => (
  <TextField
    label={props.label}
    variant='outlined'
    InputLabelProps={{ shrink: true }}
    style={{ marginTop: 15 }}
    {...props.input}
    {...props}
  />
)

const SettingsForm: React.FunctionComponent<IProps & InjectedFormProps<IProps>> = ({
  handleSubmit,
}) => {

  const { t } = useI18n();

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name='username'
        component={renderTextField}
        label={t('Username')}
        fullWidth={true}
      />
      <Field
        name='email'
        component={renderTextField}
        label={t('Email')}
        fullWidth={true}
      />
      <div style={{ marginTop: 15 }}>
        <Button
          color='primary'
          variant='outlined'
        >
          {t('Save')}
        </Button>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'SettingsForm',
})(SettingsForm)
