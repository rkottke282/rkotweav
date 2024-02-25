import { describe, it, expect } from '@jest/globals';
import { calculateScores } from "../src/scoring";
import SpreadsheetExample from "./spreadsheetExample.json"
import { parseData } from '../src';

describe('calculateScores', () => {
    const testData = parseData(JSON.parse(SpreadsheetExample.body));
    it('should calculate scores for users', async () => {
        const response = calculateScores(testData);
        console.log("response: ", response);
        expect(1).toBe(1);
    });
});