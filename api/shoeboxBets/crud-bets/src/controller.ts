import { ValidationResult } from 'joi';
import { shoeboxBetSchema, type shoeboxBet } from '../types/shoeboxBet';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from './errors/custom-error';
import { addBet } from './datasource';

export const addNew = async (body: string, email: string): Promise<shoeboxBet> => {
    const bet: ValidationResult<shoeboxBet> = shoeboxBetSchema.validate(JSON.parse(body));
    if (bet.error) {
        throw new CustomError('Bad Request',
            `Invalid format: ${JSON.stringify(bet.error)}`
        )
    }

    bet.value.iniatiator = email;

    const newUuid = uuidv4();
    bet.value.id = newUuid;

    const date = new Date();
    bet.value.initiationTimestamp = date.toISOString();
    return await addBet(bet.value);
   
}
