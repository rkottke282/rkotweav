
import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import SpreadSheetExample from '../test/spreadsheetExample.json';
import { DSVRowArray, csvParse } from 'd3';
import { calculateScores } from './scoring';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
    const data: DSVRowArray = parseData(event); //replace this with 'event' when ready to go
    const scores = calculateScores(data);
    //TODO: parse columns  - should be 'Questions' 'Answers' then n. participants
    try {
      if (event) {
          return {
          statusCode: 200,
          body: JSON.stringify(scores)
          };
      } else {
          return {
          statusCode: 404,
          body: JSON.stringify(`Unable to load spreadsheet.`),
          };
      }
    } catch (error) {
      console.error('Error fetching Google Doc:', error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal server error' }),
      };
    }
}

export const parseData = (input) => {
  //TODO: ensure input data is valid
  const worksheetData = input.data.raw.data;
  const bufferData = Buffer.from(worksheetData);
  const realData = bufferData.toString();
  const data: DSVRowArray = csvParse(realData);
  return data;
}