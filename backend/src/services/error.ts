import { logger } from "@backend/services";
import { NextFunction, Request, Response } from "@backend/types";
import { constants as StatusCodes } from "http2";

type ErrorType = keyof typeof statusCodes;

const statusCodes = {
  BadRequestError: StatusCodes.HTTP_STATUS_BAD_REQUEST,
  NotFoundError: StatusCodes.HTTP_STATUS_NOT_FOUND,
  InternalError: StatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR,
};

class SystemError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

class BadRequestError extends SystemError {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

class NotFoundError extends SystemError {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class InternalError extends SystemError {
  constructor(message: string) {
    super(message);
    this.name = "InternalError";
  }
}

function getErrorInstanceName(error: Error): ErrorType {
  return error.name as ErrorType;
}

function getStatusCode(error: ErrorType): number {
  return statusCodes[error] ? statusCodes[error] : statusCodes.InternalError;
}

function handleRequestError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  if (!err) {
    return next();
  }

  logger.error(err);

  const statusCode = getStatusCode(getErrorInstanceName(err));
  const errorMessage = err.message;
  res.status(statusCode).json({ success: false, error: errorMessage });
}

export {
  BadRequestError,
  handleRequestError,
  InternalError,
  NotFoundError,
  SystemError,
};
