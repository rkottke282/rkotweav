import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context } from 'aws-lambda'

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {

    return {
        statusCode: 200,
        body: JSON.stringify({ body: 'Hello world' })
    }
}

export { handler };