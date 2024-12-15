import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context } from 'aws-lambda'

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {

    console.log('context: ', JSON.stringify(context));
    console.log('event: ', JSON.stringify(event));
    return {
        statusCode: 200,
        body: JSON.stringify({ body: 'Hello world' })
    }
}

export { handler };