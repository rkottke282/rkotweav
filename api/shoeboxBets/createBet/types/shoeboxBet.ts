import * as Joi from 'joi'

export type shoeboxBet = {
    id: string,
    initiator: string,
    recipient: string,
    challenge: string,
    initiatorStance: string,
    recipientStance: string,
    wager: string,
    initiationTimestamp: Date,
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
    id: Joi.string().length(36).required(),
    initiator: Joi.string().pattern(new RegExp(`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`)).required(),
    recipient: Joi.string().pattern(new RegExp(`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`)).required(),
    challenge: Joi.string().required(),
    initiatorStance: Joi.string().required(),
    recipientStance: Joi.string(),
    wager: Joi.string().required(),
    initiationTimestamp: Joi.date().required(),
    acceptanceTimestamp: Joi.date(),
    resolutionTimestamp: Joi.date(),
    resolution: Joi.string(), 
    winner: Joi.string(),
    loser: Joi.string(),
    resolutionProposer: Joi.string().pattern(new RegExp(`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`)),
    resolutionProposalTimestamp: Joi.date(),
    resolutionAccepter: Joi.string().pattern(new RegExp(`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`)),
    resolutionAcceptanceTimestamp: Joi.date()
})