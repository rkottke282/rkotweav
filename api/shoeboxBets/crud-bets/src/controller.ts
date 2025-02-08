import { ValidationResult } from 'joi';
import { shoeboxBetSchema, type shoeboxBet } from '../types/shoeboxBet';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from './errors/custom-error';
import { addBet, getBet } from './datasource';

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

export const get = async (id: string): Promise<shoeboxBet> => {
    return await getBet(id);
}

export const update = async (id: string, email: string, updates: object): Promise<shoeboxBet> => {
    const existing: shoeboxBet= await get(id);
    if (existing.initiator !== email) throw new CustomError('Forbidden', 'User is not allowed to update bet'); 

    Object.keys(updates).forEach(x => {
        existing[x] = updates[x];
    });

    const updated: shoeboxBet = await addBet(existing);

    return updated;
}