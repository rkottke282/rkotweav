import * as Joi from 'joi'

export type shoeboxBet = {
    id: string,
    initiator?: string,
    recipient: string,
    challenge: string,
    initiatorStance: string,
    recipientStance?: string,
    wager?: string,
    initiationTimestamp?: string,
    acceptanceTimestamp?: string,
    resolutionTimestamp?: string,
    resolution?: string,
    winner?: string
    loser?: string,
    resolutionProposer?: string,
    resolutionProposalTimestamp?: string,
    resolutionAccepter?: string,
    resolutionAcceptanceTimestamp?: string,
}

export const shoeboxBetSchema = Joi.object({
    id: Joi.string().length(36),
    initiator: Joi.string(),
    recipient: Joi.string().required(),
    challenge: Joi.string().required(),
    initiatorStance: Joi.string().required(),
    recipientStance: Joi.string(),
    wager: Joi.string(),
    initiationTimestamp: Joi.string(),
    acceptanceTimestamp: Joi.string(),
    resolutionTimestamp: Joi.string(),
    resolution: Joi.string(), 
    winner: Joi.string(),
    loser: Joi.string(),
    resolutionProposer: Joi.string(),
    resolutionProposalTimestamp: Joi.string(),
    resolutionAccepter: Joi.string(),
    resolutionAcceptanceTimestamp: Joi.string()
})