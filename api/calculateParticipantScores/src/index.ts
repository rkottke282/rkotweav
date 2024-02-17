import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
    try {
        if (event) {
            return {
            statusCode: 200,
            body: JSON.stringify({outcome: "success"})
            //   body: JSON.stringify({
            //     title: spreadsheet.title,
            //     data: {
            //       format: 'CSV',
            //       raw: await mainWorksheet.downloadAsCSV()
            //     }
            //   }),
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