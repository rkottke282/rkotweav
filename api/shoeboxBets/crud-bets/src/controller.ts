import { ValidationResult } from 'joi';
import { type shoeboxBet } from '../types/shoeboxBet';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from './errors/custom-error';
import { put, get } from './datasource';
import { newBet, newBetSchema } from '../types/newBet';
import { resolutionProposal, resolutionProposalSchema } from '../types/resolutionProposal';

const STATUS_INITIATED: string = 'INITIATED';
const STATUS_ACCEPTED: string = 'ACCEPTED';
const STATUS_RESOLUTION_PROPOSED: string = 'RESOLUTION_PROPOSED';
const STATUS_RESOLUTION_ACCEPTED: string = 'RESOLUTION_ACCEPTED';

export const addNewBet = async (body: object, email: string): Promise<shoeboxBet> => {
    const newUuid = uuidv4();
    body['id'] = newUuid;
    body['initiator'] = email;

    const date = new Date();
    body['initiationTimestamp'] = date.toISOString();

    const bet: ValidationResult<newBet> = newBetSchema.validate(body);
    if (bet.error) {
        throw new CustomError('Bad Request',
            `Invalid format: ${JSON.stringify(bet.error.details)}`
        )
    }

    return await put(bet.value);
}

export const getBet = async (id: string): Promise<shoeboxBet> => {
    return await get(id);
}

/*
    Depending on the state of the bet, only some types of updates are possible.
      RESOLUTION-ACCEPTED: The resolutionAcceptanceTimetstamp can only be filled when the
        the resolutionProposalTimestamp is filled.  Only the resolutionAccepter can perfrom this update.
*/
export const updateBet = async (id: string, email: string, updates: object): Promise<shoeboxBet> => {
    const existing: shoeboxBet = await getBet(id);
    const betStatus: string = determineBetStatus(existing);

    if (betStatus === STATUS_INITIATED) {
        // UPDATE BY INITIATOR
        if (existing.initiator != email) {
            throw new CustomError('Forbidden', 'Only the initiator of a bet is allowed to update it.'); 
        }

        Object.keys(updates).forEach(x => {
            if (x == 'initiator' || x == 'initiationTimestamp')
                throw new CustomError('Bad Request', `Field ${x} cannot be updated.`)
            existing[x] = updates[x];
        });

        const bet: ValidationResult<newBet> = newBetSchema.validate(existing);
        if (bet.error) {
            throw new CustomError('Bad Request',
                `Invalid format: ${JSON.stringify(bet.error.details)}`
            )
        }

        const updated: shoeboxBet = await put(existing);

        return updated;
    } 

    throw new CustomError('Bad Request',
        `Due to the status of this bet, the update could not be completed. Only bets that have not been agreed to can be modified.`
    );
}

export const acceptBet = async (id: string, email: string): Promise<shoeboxBet> => {
    const existing: shoeboxBet = await getBet(id);
    const betStatus: string = determineBetStatus(existing);
    if (betStatus != STATUS_INITIATED)
        throw new CustomError('Bad Request', 
        `Due to the status of this bet, the bet could not be accepted.`);

    if (existing.recipient != email) 
        throw new CustomError('Forbidden',
            `Only the recipient of a bet can accept the bet.`);
    
    const date = new Date();
    existing['acceptanceTimestamp'] = date.toISOString();

    const updated: shoeboxBet = await put(existing);
    return updated;
}

export const proposeResolution = async (id: string, email: string, resolutionProposal: resolutionProposal): Promise<shoeboxBet> => {
    const existing: shoeboxBet = await getBet(id);
    const betStatus: string = determineBetStatus(existing);
    if (betStatus != STATUS_ACCEPTED && betStatus != STATUS_RESOLUTION_PROPOSED)
        throw new CustomError('Bad Request', 
        `Due to the status of this bet, the bet could not be proposed resolved.`);

    if (existing.recipient != email && existing.initiator != email) 
        throw new CustomError('Forbidden',
            `Only the recipient or initiator of a bet can accept the bet.`);
    
    const proposal: ValidationResult<resolutionProposal> = resolutionProposalSchema.validate(resolutionProposal);
    if (proposal.error) {
        throw new CustomError('Bad Request',
            `Invalid format: ${JSON.stringify(proposal.error.details)}`
        )
    }

    Object.keys(resolutionProposal).forEach(x => {
        existing[x] = resolutionProposal[x];
    });

    existing['resolutionProposer'] = email;

    const date = new Date();
    existing['resolutionProposalTimestamp'] = date.toISOString();

    const updated: shoeboxBet = await put(existing);

    return updated;
   
}

export const acceptResolution = async (id: string, email: string): Promise<shoeboxBet> => {
    const existing: shoeboxBet = await getBet(id);
    const betStatus: string = determineBetStatus(existing);
    if (betStatus != STATUS_RESOLUTION_PROPOSED)
        throw new CustomError('Bad Request', 
        `Due to the status of this bet, the bet could not be accepted as resolved.`);

    const requiredAccepter: string = existing.resolutionProposer === existing.initiator ? 
        existing.recipient : 
        existing.initiator;

    if (requiredAccepter != email) 
        throw new CustomError('Forbidden',
            `You are not permitted to accept the resolution of this bet.`);

    existing['resolutionAccepter'] = email;

    const date = new Date();
    existing['resolutionAcceptanceTimestamp'] = date.toISOString();

    const updated: shoeboxBet = await put(existing);

    return updated;
}

const determineBetStatus = (bet: shoeboxBet): string => {
    if (!bet.acceptanceTimestamp)
        return STATUS_INITIATED;
    else if(!bet.resolution)
        return STATUS_ACCEPTED;
    else if(!bet.resolutionAcceptanceTimestamp)
        return STATUS_RESOLUTION_PROPOSED
    else return STATUS_RESOLUTION_ACCEPTED;
}