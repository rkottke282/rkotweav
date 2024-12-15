import { describe, it, expect } from '@jest/globals';
import { convertToCSVString, convertToJson } from "../src/parser";
import * as SpreadsheetExample from "./spreadsheetExample.json";

describe('convertToCSVString', () => {
    it('should convert buffer to string', async () => {
        const testData = JSON.parse(SpreadsheetExample.body);
        const response = await convertToCSVString(testData.data.raw.data);
        // console.log("response: ", response);
        expect(response.length).toBe(6130);
    })
});

describe('convertToJson', () => {
    it('should convert buffer to json', async () => {
        const testData = JSON.parse(SpreadsheetExample.body);
        const json = await convertToJson(testData.data.raw.data);
        expect(json.length).toBe(47);
    })
});
