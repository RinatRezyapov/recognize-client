
import * as React from 'react';
import Dropzone from 'react-dropzone';
import { fromNullable, Option } from 'fp-ts/lib/Option';

import './DropzoneRenderer.scss';

interface IProps {
  children: React.ReactNode;
  accept: string;
  onDropResult: (result: Option<string | ArrayBuffer>) => void;
}

const DropzoneRenderer: React.FunctionComponent<IProps> = ({
  children,
  accept,
  onDropResult,
}) => {

  const onDrop = (files: any) =>
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

  return (
    <Dropzone
      className='DropzoneRenderer__dropzone'
      onDrop={onDrop}
      accept={accept}
    >
      {() => children}
    </Dropzone>
  )
}

export default DropzoneRenderer
