import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import withDialogProps, { IWithDialogProps } from '../decorators/withDialogProps';
import { useI18n } from '../hooks/useI18n';
import { Link } from 'react-router-dom';
import LinkButton from '../components/LinkButton';
import { fromNullable } from 'fp-ts/lib/Option';
import FormHelperText from '@material-ui/core/FormHelperText';

interface IBoundProps {
  onSubmit: (values: any) => any;
}

interface IProps extends IBoundProps {
  submitting: boolean;
  pristine: boolean;
  reset: any;
  handleSubmit: any;
  fields: any;
}

const renderTextField = (props: any) => (
  <TextField
    label={props.label}
    variant='outlined'
    InputLabelProps={{ shrink: true }}
    style={{ marginBottom: 15 }}
    error={props.meta.touched && props.meta.error}
    helperText={props.meta.touched && props.meta.error ? props.meta.error : null}
    {...props.input}
    {...props}
  />
)

const validate = (values: any)=> {
  const errors = {} as any;
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less'
  }
  if (!values.login) {
    errors.login = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
    errors.login = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be atleast 6 characters'
  }
  if (!values.repeatPassword) {
    errors.repeatPassword = 'Required'
  } else if (values.repeatPassword.length < 6) {
    errors.repeatPassword = 'Must be atleast 6 characters'
  }
  if (values.password !== values.repeatPassword) {
    errors.password = 'Passwords are not the same';
    errors.repeatPassword = 'Passwords are not the same';
  }
  return errors
}

const SignUpForm = (props: IProps & InjectedFormProps<IProps> & IWithDialogProps) => {

  const { t } = useI18n();

  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name='name'
        component={renderTextField}
        label={t('Name')}
        fullWidth={true}
      />
      <Field
        name='login'
        component={renderTextField}
        label={t('Email')}
        fullWidth={true}
      />
      <Field
        name='password'
        component={renderTextField}
        label={t('Password')}
        fullWidth={true}
        type='password'
      />
      <Field
        name='repeatPassword'
        component={renderTextField}
        label={t('Repeat password')}
        fullWidth={true}
        type='password'
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          color='primary'
          variant='outlined'
          type='submit'
          style={{ margin: '0 15px 0 0' }}
        >
          {t('SignUp')}
        </Button>
        <LinkButton
          path='/'
          color='secondary'
          variant='outlined'
        >
          {t('SignIn')}
        </LinkButton>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'SignUpForm',
  validate,
})(withDialogProps(SignUpForm))
