import React from 'react';
import ImageUploadingBase from 'react-images-uploading';
import type { ImageUploadingPropsType } from 'react-images-uploading';

type ImageUploadingProps = Omit<ImageUploadingPropsType, 'children'> & {
  children: (props: {
    imageList: Array<{ dataUrl: string }>;
    onImageUpload: () => void;
    onImageUpdate: (index: number) => void;
    isDragging: boolean;
    dragProps: any;
  }) => JSX.Element;
};

const ImageUploadingComponent =
  ImageUploadingBase as unknown as React.ComponentType<ImageUploadingProps>;

export { ImageUploadingComponent as ImageUploading };
export type { ImageListType, ImageType } from 'react-images-uploading';
