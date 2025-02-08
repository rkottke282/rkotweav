import * as Joi from 'joi'

export type resolutionProposal = {
    resolution: string,
    winner: string
    loser: string,
}

export const resolutionProposalSchema = Joi.object({
    resolution: Joi.string().required(), 
    winner: Joi.string().required(),
    loser: Joi.string().required()
})