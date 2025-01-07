import { ValidationResult } from 'joi';
import { shoeboxBetSchema, type shoeboxBet } from '../types/shoeboxBet';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from './errors/custom-error';

export const addNew = async (body: string, email: string): Promise<string> => {
    const bet: ValidationResult<shoeboxBet> = shoeboxBetSchema.validate(JSON.parse(body));
    if (bet.error) {
        throw new CustomError('Bad Request',
            `Invalid format: ${JSON.stringify(bet.error)}`
        )
    }

    if (bet.value.initiator != email) throw new CustomError('Forbidden', 
        'User is not allowed to create a bet for the given bet initiator.');
        
    const newUuid = uuidv4();
    return newUuid;
   
}
