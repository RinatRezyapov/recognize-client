import * as React from 'react';
import Cropper from 'react-cropper';

import { fromNullable, Option } from 'fp-ts/lib/Option';

import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import CropIcon from '@material-ui/icons/crop';

import 'cropperjs/dist/cropper.css';
//import './ImageCropper.scss';

interface Props {
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

interface State {

}

class ImageCropper extends React.Component<Props, State> {

  cropperRef: React.RefObject<any>;

  constructor(props: Props) {
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
    fromNullable(ref)
      .map(ref => this.cropperRef = ref)
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

export default ImageCropper