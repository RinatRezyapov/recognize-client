import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';

import LinkButton from '../components/LinkButton';
import withDialogProps, { IWithDialogProps } from '../decorators/withDialogProps';

import { useI18n } from '../hooks/useI18n';

interface IBoundProps {
  onSubmit: (values: any) => any;
}

interface IProps extends IBoundProps {

}

const renderTextField = (props: any) => (
  <TextField
    label={props.label}
    variant='outlined'
    InputLabelProps={{ shrink: true }}
    style={{ marginBottom: 15 }}
    {...props.input}
    {...props}
  />
)

const SignInForm: React.FunctionComponent<IProps & InjectedFormProps<IProps> & IWithDialogProps> = (props) => {

  const { t } = useI18n();

  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} style={{ padding: '15px 30px 30px 30px' }}>
      <Field
        name='login'
        component={renderTextField}
        label={t('Login')}
        fullWidth={true}
      />
      <Field
        name='password'
        component={renderTextField}
        label={t('Password')}
        fullWidth={true}
        type='password'
        autocomplete='off'
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          color='primary'
          variant='outlined'
          type='submit'
          style={{ marginRight: 15 }}
        >
          {t('SignIn')}
        </Button>
        <LinkButton
          path='/signup'
          color='secondary'
          variant='outlined'
        >
          {t('SignUp')}
        </LinkButton>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'SignInForm',
})(withDialogProps(SignInForm))
