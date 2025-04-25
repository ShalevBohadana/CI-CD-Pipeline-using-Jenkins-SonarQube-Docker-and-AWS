import { Request, Response, RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import httpStatus from 'http-status';

import { catchAsync } from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { mailingService } from './mailing.service';

interface IVerificationBody {
  email: string;
  userId: string;
}

interface IReportBody {
  email: string;
  reason: string;
}

interface IMailingController {
  sendVerification: RequestHandler<
    ParamsDictionary,
    any,
    IVerificationBody,
    ParsedQs
  >;
  sendOrderConfirmation: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  sendReport: RequestHandler<ParamsDictionary, any, IReportBody, ParsedQs>;
  sendPasswordReset: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  sendWelcome: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
  getEmailLogs: RequestHandler<ParamsDictionary, any, any, ParsedQs>;
}

class MailingController implements IMailingController {
  sendVerification: RequestHandler<
    ParamsDictionary,
    any,
    IVerificationBody,
    ParsedQs
  > = catchAsync(
    async (
      req: Request<ParamsDictionary, any, IVerificationBody>,
      res: Response,
    ) => {
      const { email, userId } = req.body;
      await mailingService.sendEmailVerification({ email, userId });
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Verification email sent successfully',
      });
    },
  );

  sendOrderConfirmation: RequestHandler<ParamsDictionary, any, any, ParsedQs> =
    catchAsync(async (req: Request, res: Response) => {
      await mailingService.sendOrderConfirmation(req.body);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order confirmation email sent successfully',
      });
    });

  sendReport: RequestHandler<ParamsDictionary, any, IReportBody, ParsedQs> =
    catchAsync(
      async (
        req: Request<ParamsDictionary, any, IReportBody>,
        res: Response,
      ) => {
        const { email, reason } = req.body;
        await mailingService.sendEmailForReport(email, reason);
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Report email sent successfully',
        });
      },
    );

  sendPasswordReset: RequestHandler<ParamsDictionary, any, any, ParsedQs> =
    catchAsync(async (req: Request, res: Response) => {
      await mailingService.sendPasswordReset(req.body);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password reset email sent successfully',
      });
    });

  sendWelcome: RequestHandler<ParamsDictionary, any, any, ParsedQs> =
    catchAsync(async (req: Request, res: Response) => {
      await mailingService.sendWelcomeEmail(req.body);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Welcome email sent successfully',
      });
    });

  getEmailLogs: RequestHandler<ParamsDictionary, any, any, ParsedQs> =
    catchAsync(async (req: Request, res: Response) => {
      const logs = await mailingService.getEmailLogs(req.query);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Email logs retrieved successfully',
        data: logs,
      });
    });
}

export const mailingController = new MailingController();
