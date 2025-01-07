import { APIGatewayEventRequestContextLambdaAuthorizer, APIGatewayEventRequestContextV2, APIGatewayRequestAuthorizerEventV2, APIGatewayRequestSimpleAuthorizerHandlerV2WithContext, APIGatewaySimpleAuthorizerWithContextResult, Callback } from 'aws-lambda'
import { TokenInfo } from 'google-auth-library';
import { getTokenInfo } from './google-auth';

const handler = async (event: APIGatewayRequestAuthorizerEventV2, 
    context: APIGatewayEventRequestContextV2) => {
        try {
            const identitySource: string = event.identitySource[0];
            if (!identitySource) throw Error('Bad authorization');
            const token: string = identitySource.replace('Bearer ', '');
            const tokenInfo: TokenInfo = await getTokenInfo(token);
            if (!tokenInfo) throw Error('Failed to retrieve token info');
            //if (tokenInfo.aud != CLIENT_ID) throw Error('Incorrect client id');
            console.log(`Authorized.  Email: ${tokenInfo.email}, Endpoint: ${event.routeKey}`)
            return {
                isAuthorized: true,
                context: {
                    email: tokenInfo.email
                }
            }
        } catch (err) {
            console.log('Failed authorizer.  Error: ', err);
            return {
                isAuthorized: false,
            }
        }
    
}

export { handler };