import {
  CustomHttpExceptionResponse,
  HttpExceptionResponse,
} from './models/httpExceptionResponseInterface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      errorMessage =
        (errorResponse as HttpExceptionResponse).error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error!';
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    this.getErrorLog(errorResponse, request, exception);

    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timestamp: new Date(),
  });
  private getErrorLog = (
    errorResponse: CustomHttpExceptionResponse,
    request: Request,
    exception: unknown,
  ): string => {
    const { statusCode, error } = errorResponse;
    const { url, method } = request;
    const errorLog = `Response Code: 
    ${statusCode} - errorMessage: ${error} - Method: ${method} - URL: ${url}\n\n
      ${JSON.stringify(errorResponse)}\n\n
      ${exception instanceof HttpException ? exception.stack : error}\n\n`;
    console.log(7, errorLog);
    return errorLog;
  };
}
