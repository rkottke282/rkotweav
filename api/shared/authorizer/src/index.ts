import { APIGatewayEventRequestContextLambdaAuthorizer, APIGatewayEventRequestContextV2, APIGatewayRequestAuthorizerEventV2, APIGatewayRequestSimpleAuthorizerHandlerV2WithContext, APIGatewaySimpleAuthorizerWithContextResult, Callback } from 'aws-lambda'

const handler = async (event: APIGatewayRequestAuthorizerEventV2, 
    context: APIGatewayEventRequestContextV2) => {
    console.log('event: ', JSON.stringify(event));
    const response = {
        isAuthorized: true,
        context: {
            identitySource: event.identitySource
        }
    }
    console.log('response: ', JSON.stringify(response));
    return response;
}

export { handler };