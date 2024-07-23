import { describe, it, expect } from '@jest/globals';
import { initScores, rankParticipantScores, score } from "../src/scorer";
import * as SpreadsheetExample from './spreadsheetExample.json'
import { convertToJson } from '../src/parser';

describe('calculateScores', () => {
    it('should calculate scores for users', async () => {
        const testData = await convertToJson(JSON.parse(SpreadsheetExample.body).data.raw.data);
        const response = score(testData);
        expect(response['participantScores']['Adam']).toBe(19);  
    });
});

describe('rankParticipantScores', () => {
    const participantScores = {
        'Mike': 25,
        'Aly': 19,
        'Kaeli ': 22,
        'Stephen': 19,
        'Kyle': 0,
        'Reed': 20,
        'Dave': 20,
        'Al': 22,
        'Christie': 17,
        'Lauren': 0,
        'Sarah K': 0,
        'Shelby ': 23,
        'Sarah': 26,
        'Adam': 19
    }
    it('should rank participants', async () => {
        const rankedParticipantScores = rankParticipantScores(participantScores);
        expect(rankedParticipantScores[1]).toStrictEqual(['Sarah']);
        expect(rankedParticipantScores[6]).toStrictEqual(['Aly', 'Stephen', 'Adam']);
    });
})

describe('initScores', () => {
    it('should init a scores dictionary', async () => {
        const testData = await convertToJson(JSON.parse(SpreadsheetExample.body).data.raw.data);
        const scores = initScores(testData);
        expect(Object.keys(scores).length).toBe(14);
    });
});