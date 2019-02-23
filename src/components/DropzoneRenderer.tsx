
import * as React from 'react';
import Dropzone from 'react-dropzone';
import { fromNullable, Option } from 'fp-ts/lib/Option';

interface IProps {
  children: any;
  accept: string;
  onDropResult: (result: Option<string | ArrayBuffer>) => void;
}

const DropzoneRenderer = ({
  children,
  accept,
  onDropResult,
}: IProps) => {

  const onDrop = (files: any) => {
    fromNullable(files.length)
      .filter(length => length !== 0)
      .map(() => {
        const file = files[files.length - 1];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          onDropResult(fromNullable(reader.result))
        }
      })
  }

  return (
    <Dropzone
      onDrop={onDrop}
      accept={accept}
      style={{ border: 'none' }}
    >
      {() => children}
    </Dropzone>
  )
}

export default DropzoneRenderer
