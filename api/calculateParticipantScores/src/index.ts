
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { score } from './scorer';
import { convertToJson } from './parser';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
      if (event) {
        const rawInputData = JSON.parse(event.body).data.raw.data;
        const data = await convertToJson(rawInputData);
        console.log('data: ', data);
        const scores = score(data);
        
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
      console.error('Error calulating scores. Error:', error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal server error' }),
      };
    }
}