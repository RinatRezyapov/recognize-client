import * as React from 'react';
import Cropper from 'react-cropper';

import { fromNullable, Option } from 'fp-ts/lib/Option';

import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import CropIcon from '@mui/icons-material/crop';

import 'cropperjs/dist/cropper.css';

interface IProps {
  src: string;
  minCropBoxWidth: Option<number>;
  minCropBoxHeight: Option<number>;
  aspectRatio: number;
  cropBoxMovable: boolean;
  cropBoxResizable?: boolean;
  cropperWidth: number;
  cropperHeight: number;
  onCropResult: (result: any) => void;
  closeDialog: () => void;
}

class ImageCropper extends React.Component<IProps> {

  cropperRef: React.RefObject<any>;

  constructor(props: IProps) {
    super(props);

    this.cropperRef = React.createRef();

    this.onCrop = this.onCrop.bind(this);
    this.refHandler = this.refHandler.bind(this);
  }

  onCrop() {
    this.props.onCropResult((this.cropperRef as any).getCroppedCanvas().toDataURL());
    this.props.closeDialog()
  }

  refHandler(ref: any) {
    fromNullable(ref).map(refVal => this.cropperRef = refVal);
  }

  render() {
    return (
      <div className='ImageCropper__root-container'>
        <Toolbar>
          <IconButton onClick={this.onCrop}>
            <CropIcon />
          </IconButton>
        </Toolbar>
        <Cropper
          ref={this.refHandler}
          src={this.props.src}
          style={{ height: this.props.cropperHeight, width: this.props.cropperWidth }}
          minCropBoxWidth={this.props.minCropBoxWidth.getOrElse(300)}
          minCropBoxHeight={this.props.minCropBoxHeight.getOrElse(300)}
          aspectRatio={this.props.aspectRatio}
          guides={false}
          cropBoxMovable={this.props.cropBoxMovable}
          cropBoxResizable={this.props.cropBoxResizable}
        />
      </div>
    );
  }
}

export default ImageCropper;
