// types/multer.d.ts
import { Request } from 'express';

declare namespace Express {
  export interface MulterFile extends globalThis.Buffer {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
  }
}

declare namespace Multer {
  /** Object containing file metadata and access information. */
  export interface File {
    /** Name of the form field associated with this file. */
    fieldname: string;
    /** Name of the file on the uploader's computer. */
    originalname: string;
    /** Value of the `Content-Type` header for this file. */
    mimetype: string;
    /** Size of the file in bytes. */
    size: number;
    /** `DiskStorage` only: Directory to which this file has been uploaded. */
    destination?: string;
    /** `DiskStorage` only: Name of this file within `destination`. */
    filename?: string;
    /** `DiskStorage` only: Full path to the uploaded file. */
    path?: string;
    /** `MemoryStorage` only: A Buffer containing the entire file. */
    buffer?: globalThis.Buffer;
  }

  interface MulterRequest extends Request {
    file?: File;
    files?: File[];
    body: {
      folderPath?: string;
      [key: string]: any;
    };
  }
}
