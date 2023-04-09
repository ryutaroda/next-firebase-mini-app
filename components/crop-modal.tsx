import * as Slider from '@radix-ui/react-slider';
import { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Button from './button';
import Modal from './modal';

type Props = {
  src: string;
  aspect: number;
  onCrop: (img: string) => void;
  onClose: VoidFunction;
  size: {
    width: number;
    height: number;
  };
};

const CropModal = ({ src, aspect, size, onCrop, onClose }: Props) => {
  const cropperRef = useRef<HTMLImageElement>(null);

  let cropper: Cropper;
  let initialZoom: number;

  const onInit = () => {
    const imageElement = cropperRef?.current as ReactCropperElement;
    cropper = imageElement?.cropper;

    const imageData = cropper.getImageData();
    initialZoom ||= imageData.width / imageData.naturalWidth;
  };

  const crop = () => {
    onCrop(cropper.getCroppedCanvas(size).toDataURL());
    onClose();
  };

  const changeZoom = ([value]: number[]) => {
    const zoom = initialZoom * (1 + value / 100);
    cropper.zoomTo(zoom);
  };

  return (
    <Modal isOpen={Boolean(src)} onClose={onClose}>
      <div className="rounded-lg overflow-hidden mb-4">
        <Cropper
          src={src}
          style={{ height: 400, width: 400 }}
          aspectRatio={aspect}
          guides={false}
          ref={cropperRef}
          ready={onInit}
          cropBoxMovable={false}
          cropBoxResizable={false}
          toggleDragModeOnDblclick={false}
          center={false}
          viewMode={3}
          dragMode="move"
          autoCropArea={1}
          zoomOnWheel={false}
        />
      </div>

      <Slider.Root
        className="w-full flex items-center h-5 mb-6 relative"
        onValueChange={changeZoom}
      >
        <Slider.Track className="rounded-full relative bg-gray-400 block h-1 w-full overflow-hidden">
          <Slider.Range className="bg-blue-400 absolute block h-full" />
        </Slider.Track>
        <Slider.Thumb className="w-5 h-5 shadow rounded-full bg-blue-400 block" />
      </Slider.Root>

      <Button onClick={crop}>トリミング</Button>
    </Modal>
  );
};

export default CropModal;