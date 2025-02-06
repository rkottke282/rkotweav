import * as Joi from 'joi'

export type shoeboxBet = {
    id: string,
    initiator?: string,
    recipient: string,
    challenge: string,
    initiatorStance: string,
    recipientStance: string,
    wager: string,
    initiationTimestamp?: Date,
    acceptanceTimestamp?: Date,
    resolutionTimestamp?: Date,
    resolution?: string,
    winner?: string
    loser?: string,
    resolutionProposer?: string,
    resolutionProposalTimestamp?: Date,
    resolutionAccepter?: string,
    resolutionAcceptanceTimestamp?: Date,
}

export const shoeboxBetSchema = Joi.object({
    id: Joi.string().length(36),
    initiator: Joi.string(),
    recipient: Joi.string().required(),
    challenge: Joi.string().required(),
    initiatorStance: Joi.string().required(),
    recipientStance: Joi.string().required(),
    wager: Joi.string(),
    initiationTimestamp: Joi.date(),
    acceptanceTimestamp: Joi.date(),
    resolutionTimestamp: Joi.date(),
    resolution: Joi.string(), 
    winner: Joi.string(),
    loser: Joi.string(),
    resolutionProposer: Joi.string(),
    resolutionProposalTimestamp: Joi.date(),
    resolutionAccepter: Joi.string(),
    resolutionAcceptanceTimestamp: Joi.date()
})