import { generate } from 'random-words';

export const generateRandomKey = (): string => {
    const newKey =  generate({ exactly: 3, minLength: 3, maxLength: 8, join:"-"});
    return newKey
}
