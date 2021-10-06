import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';

import LinkButton from '../../components/LinkButton';
import withDialogProps, { IWithDialogProps } from '../../decorators/withDialogProps';

import { useI18n } from '../../hooks/useI18n';
import { CircularProgress } from '@mui/material';

import './SignInForm.scss';

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

  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
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
      <div className='SignInForm__buttonsContainer'>
        <Button
          className='SignInForm__signInButton'
          color='primary'
          variant='outlined'
          type='submit'
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={20} /> : t('SignIn')}
        </Button>
        <LinkButton
          to='/signup'
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
