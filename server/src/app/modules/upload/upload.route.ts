import express, { Router } from "express";

import uploadMiddleware from '../../middlewares/fileUploader';
import { UploadFileController } from './upload.controller';

const router: Router = express.Router();

router.post('/', uploadMiddleware, UploadFileController.uploadFile);

export const UploadRoute: Router = router;
