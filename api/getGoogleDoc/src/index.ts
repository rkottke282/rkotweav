// serverless.ts

import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { getAuth } from './auth';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet, type GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

// Set up Google API credentials
const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  try {
    const docId: string = event["docId"]; 
    console.trace(`Retrieving doc with id: ${docId}`);
    // Fetch Google Doc content
    const auth: JWT = getAuth();
    let spreadsheet;
    try {
      spreadsheet = new GoogleSpreadsheet(`${docId}`, auth);
      await spreadsheet.loadInfo(); 
    } catch (err) {
      console.error(`Error retrieving spreadsheet: ${err}`);
    }

    const mainWorksheet: GoogleSpreadsheetWorksheet = spreadsheet.sheetsByIndex[0];
    
    if (spreadsheet) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          title: spreadsheet.title,
          data: {
            format: 'CSV',
            raw: await mainWorksheet.downloadAsCSV()
          }
        }),
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
};

export { handler };
