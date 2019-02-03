import * as React from 'react';
import TextField from '@material-ui/core/TextField';

export const renderTextField = (props: any) => (
  <TextField
    label={props.label}
    variant='outlined'
    InputLabelProps={{ shrink: true }}
    style={{ marginTop: 15 }}
    error={props.meta.touched && props.meta.error}
    helperText={props.meta.touched && props.meta.error ? props.meta.error : null}
    {...props.input}
    {...props}
  />
)

export const renderSelectField = (props: any) => (
  <TextField
    select={true}
    margin='normal'
    variant='outlined'
    style={{ marginTop: 15 }}
    label={props.label}
    error={props.meta.touched && props.meta.error}
    helperText={props.meta.touched && props.meta.error ? props.meta.error : null}
    {...props.input}
    {...props}
  >
    {props.children}
  </TextField>
)
