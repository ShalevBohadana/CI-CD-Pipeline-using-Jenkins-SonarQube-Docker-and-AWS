import { Request, Response, RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import httpStatus from 'http-status';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { catchAsync } from '../../../shared/catchAsync';
import { sendSuccessResponse } from '../../../shared/customResponse';
import convertToWebP from '../../middlewares/convertToWebP';

// Types and Interfaces
interface IUploadedFile {
  filename: string;
  path: string;
  size: number;
  mimetype: string;
}

interface IUploadResponse {
  message: string;
  data: string | string[];
}

interface IUploadFileController {
  uploadFile: RequestHandler<
    ParamsDictionary,
    IUploadResponse,
    { dynamicPath?: string },
    ParsedQs
  >;
}

// Constants
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Helper Functions
const validateFile = (file: IUploadedFile): void => {
  if (!file.mimetype || !ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `File size too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    );
  }
};

const uploadFile = catchAsync(async (req: Request, res: Response) => {
  const uploadedFiles = req.files as unknown as {
    image: IUploadedFile[] | IUploadedFile;
  };
  const dynamicPath = req.body.dynamicPath || 'default';

  // Validate request
  if (!uploadedFiles || !uploadedFiles.image) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No image file uploaded');
  }

  // Handle both single and multiple files
  const files = Array.isArray(uploadedFiles.image)
    ? uploadedFiles.image
    : [uploadedFiles.image];

  // Validate each file
  files.forEach(validateFile);

  // Convert images to WebP
  const convertedImages = files.map((file) => convertToWebP(file.filename));

  // Generate URLs for converted images
  const imageUrls = convertedImages.map(
    (filename) => `${config.image_url}/${dynamicPath}/${filename}`,
  );

  const responseData = {
    message:
      files.length > 1
        ? 'Images uploaded successfully'
        : 'Image uploaded successfully',
    data: files.length > 1 ? imageUrls : imageUrls[0],
  };

  sendSuccessResponse(res, responseData);
});

export const UploadFileController: IUploadFileController = {
  uploadFile,
};
