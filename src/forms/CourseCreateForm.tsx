import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { useI18n } from '../hooks/useI18n';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { renderTextField, renderSelectField } from '../utils/reduxFormFields';
import MenuItem from '@material-ui/core/MenuItem';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './CourseCreateFormStyles';
import Button from '@material-ui/core/Button';
import { fromNullable, Option, none, some } from 'fp-ts/lib/Option';
import { uploadFile } from '../thunks/files';
import DropzoneRenderer from '../components/DropzoneRenderer';
import { useMaterialDialog } from '../hooks/useMaterialDialog';
import ImageCropper from '../components/ImageCropper';
import { generateFileLink } from '../utils/converters';
import { Id } from '../api/entities';

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

const validate = (values: any) => {
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

let CourseCreateForm = ({
  classes,
  submitting,
  pristine,
  handleSubmit,
  initialValues,
  change,
}: IProps & InjectedFormProps<IProps>) => {

  const { t } = useI18n();
  const [tab, setTab] = useState(TAB_GENERAL);
  const { openDialog, closeDialog, renderDialog } = useMaterialDialog();

  const onTabChange = (e: any, value: number) => setTab(value);

  const uploadCropResult = (result: any) => {
    uploadFile(result)
      .then(response => change('picture', fromNullable(response)))
  }

  const onCoursePictureFileDrop = (result: Option<string>) => {
    result
      .map(result => {
        const dialogId = openDialog(
          t('Crop image'),
          (
            <ImageCropper
              src={result}
              minCropBoxWidth={some(400)}
              minCropBoxHeight={some(100)}
              aspectRatio={4/1}
              cropBoxMovable={true}
              cropBoxResizable={false}
              cropperWidth={400}
              cropperHeight={100}
              onCropResult={uploadCropResult}
              closeDialog={() => closeDialog(dialogId)}
            />
          ),
          [],
        )
      })
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
        return <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Field
            name='picture'
            component={(props: any) =>
              <DropzoneRenderer
                accept='image/*'
                onDropResult={onCoursePictureFileDrop}
              >
                <CardMedia
                  className={classes.media}
                  image={
                    props.input.value
                      .map((fileId: Id<File>) => generateFileLink(fileId))
                      .getOrElse(require('../assets/defaultProfile.png'))
                  }
                />
              </DropzoneRenderer>
            }
          />
        </div>
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
      {renderDialog()}
    </form>
  )
};

export default reduxForm({
  form: 'CourseCreateForm',
  validate,
})(withStyles(styles)(CourseCreateForm))