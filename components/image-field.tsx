import { XCircleIcon } from '@heroicons/react/24/solid';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import CropModal from './crop-modal';
import { UseFormRegisterReturn } from 'react-hook-form';
import { classNames } from '../lib/class-names';

type Props = {
  register: UseFormRegisterReturn;
  setter: (value: string | undefined) => void;
  error?: boolean;
  defaultImage?: string;
  size: {
    width: number;
    height: number;
  };
  aspect: number;
};

const ImageField = ({
  register,
  error,
  setter,
  size,
  aspect,
  defaultImage,
}: Props) => {
  const [image, setImage] = useState<string | undefined>(defaultImage);
  const [targetImage, setTargetImage] = useState<string>();

  const onCrop = (croppedImage: string) => {
    setImage(croppedImage);
  };

  const removeImage = () => {
    setImage(undefined);
  };

  useEffect(() => {
    setter(image);
  }, [image]);

  return (
    <>
      <input {...register} type="text" className="hidden" />
      <label
        className={classNames(
          'inline-block relative cursor-pointer overflow-hidden rounded-lg shadow-lg',
          error && 'ring-2 ring-red-500'
        )}
      >
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const target = e.currentTarget;
            const file = target.files?.[0];

            const reader = new FileReader();

            reader.onload = () => {
              setTargetImage(reader.result as string);
              target.value = '';
            };

            reader.readAsDataURL(file as Blob);
          }}
        />
        {image ? (
          <img src={image} alt="" className="w-40" />
        ) : (
          <div className="bg-gray-300 w-40 aspect-w-6 aspect-h-8"></div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <PhotoIcon className="w-10 text-white opacity-20" />
        </div>
        {image && (
          <button
            className="absolute top-0 right-0 w-10 h-10 p-3 text-white"
            onClick={(e) => {
              removeImage();
              e.preventDefault();
            }}
            type="button"
          >
            <XCircleIcon />
          </button>
        )}
      </label>

      <CropModal
        src={targetImage!}
        size={size}
        aspect={aspect}
        onCrop={onCrop}
        onClose={() => setTargetImage(undefined)}
      />
    </>
  );
};

export default ImageField;