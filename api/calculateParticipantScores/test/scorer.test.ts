import { describe, it, expect } from '@jest/globals';
import { initScores, score } from "../src/scorer";
import SpreadsheetExample from "./spreadsheetExample.json"
import { convertToJson } from '../src/parser';

describe('calculateScores', () => {
    it('should calculate scores for users', async () => {
        const testData = await convertToJson(JSON.parse(SpreadsheetExample.body).data.raw.data);
        const response = score(testData);
        expect(response['participantScores']['Adam']).toBe(19);  
    });
});

describe('initScores', () => {
    it('should init a scores dictionary', async () => {
        const testData = await convertToJson(JSON.parse(SpreadsheetExample.body).data.raw.data);
        const scores = initScores(testData);
        expect(Object.keys(scores).length).toBe(14);
    });
});