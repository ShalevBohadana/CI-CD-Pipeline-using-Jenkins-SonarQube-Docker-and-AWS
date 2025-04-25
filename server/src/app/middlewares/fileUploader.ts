import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback, Multer } from 'multer';
import path from 'path';
import sharp from 'sharp';
import { kebabCasedUrl } from '../../shared/utilities';

export const DEFAULT_IMAGE_PATH = '/images';
export const ALLOWED_IMAGE_FORMATS = ['.webp', '.jpg', '.jpeg', '.png'];
export const maxImageSize = 10 * 1024 * 1024; // 10MB

type MulterRequest = Request & { file?: Express.Multer.File };

type StorageCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (_req: any, _file: Express.Multer.File, cb: StorageCallback) => {
    const uploadPath = path.join(process.cwd(), 'uploads');
    cb(null, uploadPath);
  },
  filename: (_req: any, file: Express.Multer.File, cb: FileNameCallback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, kebabCasedUrl(file.originalname) + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_IMAGE_FORMATS.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error('Not an allowed image format!'));
  }
};

const upload: Multer = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxImageSize
  }
});

const uploadHandler = upload.single('image');

const fileUploader = (req: Request, res: Response<any>, next: NextFunction): void => {
  uploadHandler(req as any, res as any, async (err: unknown) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({
          message: `File too large! Maximum size is ${maxImageSize / (1024 * 1024)}MB`
        });
        return;
      }
      res.status(400).json({ message: err.message });
      return;
    } else if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }

    const multerReq = req as MulterRequest;
    if (multerReq.file) {
      try {
        await sharp(multerReq.file.path)
          .resize(800, 800, { fit: 'inside' })
          .toFormat('webp')
          .toFile(multerReq.file.path + '.webp');
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: 'Error processing image: ' + error.message });
          return;
        }
      }
    }

    next();
  });
};

export default fileUploader;
