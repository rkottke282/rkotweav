import * as Joi from 'joi'

export type newBet = {
    id: string,
    initiator: string,
    recipient: string,
    challenge: string,
    initiatorStance: string,
    recipientStance: string,
    wager?: string,
    initiationTimestamp: string,
    resolutionTimestamp?: string,
}

export const newBetSchema = Joi.object({
    id: Joi.string().length(36),
    initiator: Joi.string(),
    recipient: Joi.string().required(),
    challenge: Joi.string().required(),
    initiatorStance: Joi.string().required(),
    recipientStance: Joi.string().required(),
    wager: Joi.string(),
    initiationTimestamp: Joi.string(),
    resolutionTimestamp: Joi.string()
})