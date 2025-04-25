import { useState } from 'react';
import { FieldValues, UseFormSetValue, Path, PathValue } from 'react-hook-form';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Upload } from 'lucide-react';

type Props<T extends FieldValues> = {
  index: number;
  setValue: UseFormSetValue<T>;
  defaultValue?: string;
};

export const GameSliderImageInput = <T extends FieldValues>({
  index,
  setValue,
  defaultValue = undefined,
}: Props<T>) => {
  const [images, setImages] = useState<ImageListType>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleGameSliderImageUpload = async (imageList: ImageListType) => {
    setImages(imageList);
    if (imageList[0]?.file) {
      const imageUrl = URL.createObjectURL(imageList[0].file);
      const path = `sliders.${index}.imageUrl` as Path<T>;
      setValue(path, imageUrl as PathValue<T, Path<T>>);
    }
  };

  const uploadedImage = (images[0]?.dataUrl as string) || defaultValue;

  return (
    <div className='w-full'>
      <ImageUploading
        value={images}
        onChange={handleGameSliderImageUpload}
        multiple={false}
        dataURLKey='dataUrl'
      >
        {({ onImageUpload, dragProps }) => (
          <div
            className='relative group'
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
          >
            <div
              role='button'
              tabIndex={0}
              onClick={onImageUpload}
              {...dragProps}
              className={`
                relative w-full h-80 transition-all duration-300
                bg-gradient-to-br from-gray-800 to-gray-900
                border-2 border-dashed
                ${
                  isDragging
                    ? 'border-blue-400 shadow-lg scale-[0.99]'
                    : 'border-gray-600 hover:border-blue-400'
                }
                overflow-hidden cursor-pointer rounded-lg
                before:absolute before:inset-0 
                before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10
                before:opacity-0 before:transition-opacity
                hover:before:opacity-100
              `}
            >
              {uploadedImage ? (
                <div className='relative h-full'>
                  <img
                    src={uploadedImage}
                    alt={`Game Slider ${index + 1}`}
                    className='w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300'>
                    <div className='absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform'>
                      <div className='flex items-center gap-3 text-white/90 hover:text-white'>
                        <Upload className='w-5 h-5' />
                        <span className='text-lg font-medium'>Replace Image</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 p-6'>
                  {isDragging ? (
                    <div className='text-center text-blue-400 transform scale-110 transition-transform'>
                      <Upload className='w-10 h-10 mx-auto mb-3 animate-bounce' />
                      <p className='text-xl font-medium'>Release to Upload</p>
                    </div>
                  ) : (
                    <div className='text-center text-gray-400'>
                      <Upload className='w-10 h-10 mx-auto mb-4 opacity-50' />
                      <p className='text-lg font-medium mb-2'>Drop image here or click to browse</p>
                      <p className='text-sm text-gray-500'>High quality images recommended</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default GameSliderImageInput;
