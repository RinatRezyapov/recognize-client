import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { useI18n } from '../hooks/useI18n';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { renderTextField, renderSelectField } from '../utils/reduxFormFields';
import MenuItem from '@material-ui/core/MenuItem';
import Dropzone from 'react-dropzone';
import CardMedia from '@material-ui/core/CardMedia';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles/CourseCreateForm';
import Button from '@material-ui/core/Button';
import { fromNullable, Option } from 'fp-ts/lib/Option';
import { uploadFile } from '../thunks/files';

const TAB_GENERAL = 0;
const TAB_CONTENT = 1;
const TAB_SETTINGS = 2;

interface IProps {
  submitting: boolean;
  pristine: boolean;
  reset: any;
  fields: any;
  initialValues: {
    buttonLabel: string;
  };
  classes: any;
  onSubmit: (values: any) => any;
  handleSubmit: () => void;
}

const validate = (values: any)=> {
  const errors = {} as any;
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.language) {
    errors.language = 'Required'
  }
  if (!values.shortDescription) {
    errors.shortDescription = 'Required'
  }
  if (!values.data) {
    errors.data = 'Required'
  }
  return errors
}

const TabContainer = (props: { children: React.ReactChild }) => {
  return (
    <Typography variant='subtitle1' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const CourseCreateForm = ({
  classes,
  submitting,
  pristine,
  handleSubmit,
  initialValues,
  change,
}: IProps & InjectedFormProps<IProps>) => {

  const { t } = useI18n();
  const [tab, setTab] = useState(TAB_GENERAL);

  const onTabChange = (e: any, value: number) => setTab(value);

  const onCoursePictureFileDrop = (files: any) => {
    if (files.length === 0) {
      return
    }
    const file = files[files.length - 1];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      fromNullable(reader.result)
        .map(result => {
          uploadFile(result as any)
            .then(fileId => change('picture', fileId))
        })
    }
  }

  const getTabContent = () => {
    switch (tab) {
      case TAB_GENERAL:
        return (
          <>
            <Field
              name='name'
              component={renderTextField}
              label={t('Name')}
              fullWidth={true}
            />
            <Field
              name='language'
              component={renderSelectField}
              label='Language'
              fullWidth={true}
            >
              <MenuItem value='english'>{t('English')}</MenuItem>
              <MenuItem value='russian'>{t('Russian')}</MenuItem>
              <MenuItem value='numeric'>{t('Numeric')}</MenuItem>
            </Field>
            <Field
              name='shortDescription'
              component={renderTextField}
              label={t('Short description')}
              fullWidth={true}
            />
            <Field
              name='data'
              component={renderTextField}
              label={t('Data')}
              multiline={true}
              rows='8'
              fullWidth={true}
            />
            <Field
              name='tags'
              component={renderTextField}
              label={t('Tags')}
              fullWidth={true}
            />
          </>
        )
      case TAB_CONTENT:
        return (
          <div>
            <Dropzone
              onDrop={onCoursePictureFileDrop}
              accept='image/*'
              style={{ border: 'none' }}
            >
              {
                (props) => <CardMedia
                  className={classes.media}
                  title='Course picture'
                >
                  <Typography style={{ color: grey[500] }}>{t('Drag or click to upload picture')}</Typography>
                </CardMedia>
              }
            </Dropzone>
          </div>
        )
      case TAB_SETTINGS:
        return <div />
      default:
        return <div>{t('Undefined content')}</div>
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs
        value={tab}
        onChange={onTabChange}
        indicatorColor='primary'
        textColor='primary'
        fullWidth={true}
      >
        <Tab value={TAB_GENERAL} label={t('General')} />
        <Tab value={TAB_CONTENT} label={t('Content')} />
        <Tab value={TAB_SETTINGS} label={t('Settings')} />
      </Tabs>
      <TabContainer>{getTabContent()}</TabContainer>
      <div style={{ textAlign: 'right' }}>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          disabled={pristine || submitting}
        >
          {initialValues.buttonLabel}
        </Button>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'CourseCreateForm',
  validate,
})(withStyles(styles)(CourseCreateForm))
