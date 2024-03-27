import Joi from 'joi';
import { CURRENCY, PREFIX } from '../../types';

const campaignSchema = {
    create: Joi.object({
        from: Joi.date().min('now'),
        to: Joi.alternatives().conditional('from', {
            not: Joi.exist(),
            then: Joi.date().min('now'),
            otherwise: Joi.date().greater(Joi.ref('from')),
        }),
        amount: Joi.number().min(0),
        currency: Joi.string().valid(...Object.values(CURRENCY)),
        prefix: Joi.string()
            .valid(...Object.values(PREFIX))
            .required(),
    }),
    list: Joi.object({
        take: Joi.number().min(1).max(100),
        skip: Joi.number().min(0),
    }),
}

const voucherSchema = {
    createMany: Joi.object({
        amount: Joi.number().min(1).max(100).required(),
    }),
    list: Joi.object({
        take: Joi.number().min(1).max(100),
        skip: Joi.number().min(0),
    }),
    export: Joi.object({
    }),
};

export default {
    campaign: campaignSchema,
    voucher: voucherSchema,
};
