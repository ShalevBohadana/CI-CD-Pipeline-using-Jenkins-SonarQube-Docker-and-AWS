import { NextFunction, Request, Response } from 'express';

import { fieldsForFormatArray } from '../../constant/shared.constant';

const formatArrayFields = (req: Request, res: Response, next: NextFunction) => {
  fieldsForFormatArray.forEach((field) => {
    if (req.body[field] && typeof req.body[field] === 'string') {
      req.body[field] = req.body[field].split(',').map((s: string) => s.trim());
    }
  });
  next();
};

export default formatArrayFields;
