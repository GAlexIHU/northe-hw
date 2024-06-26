import express from "express";
import Joi from "joi";
import { Logger } from "winston";

export type Request = express.Request;
export type Response = express.Response;
export type NextFunction = express.NextFunction;

export type PREFIX = string;

export enum CURRENCY {
  USD = "USD",
  EUR = "EUR",
}

export type ValidationSchema = Joi.ObjectSchema;

export type CreateCampaignInput = {
  from?: Date;
  to?: Date;
  amount?: number;
  currency?: CURRENCY;
  prefix: PREFIX;
};

export type ListCampaignInput = {
  take?: number;
  skip?: number;
};

export type DeleteCampaignInput = {
  id: string;
};

export type CreateVoucherManyInput = {
  campaignId: string;
  amount: number;
};

export type ListVoucherInput = {
  campaignId: string;
  take?: number;
  skip?: number;
};

export type ExportVouchersInput = {
  campaignId: string;
};

export type CatchErrorParams = {
  message: string;
  toLog?: boolean;
  toThrow?: boolean;
};

export type Callback = () => void;

export type MiddlewareResponse = Response | void;
export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => MiddlewareResponse | Promise<MiddlewareResponse>;

export type Config = {
  env: string;
  isDev: boolean;
  isTest: boolean;
  port: number;
  host: string;
  urlMount: string;
  db: DBConfig;
  pageLimit: number;
  discountCode: DiscountCode;
  corsOrigin: string;
};

export type DBConfig = {
  password: string;
  user: string;
  name: string;
  port: number;
  host: string;
};

export type DiscountCode = {
  allowedChars: string;
  length: number;
};

export interface ILogger extends Logger {}

export interface Constructable<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any): T;
}
