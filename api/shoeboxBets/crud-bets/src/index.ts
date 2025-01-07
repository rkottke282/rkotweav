import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyEventV2, APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayEventLambdaAuthorizerContext, APIGatewayAuthorizerEvent, APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { shoeboxBet, shoeboxBetSchema } from '../types/shoeboxBet';
import { ValidationResult } from 'joi';
import { addNew } from './controller';

const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2WithLambdaAuthorizer<any>) => {
    try {
        const email: string = event.requestContext.authorizer.lambda.email;
        console.log('received an event: ', event);
        if (event.routeKey == 'POST /bets') {
            const uuid: string = await addNew(event.body, email);
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "message": `Bet has been created. UUID: ${await addNew(event.body, email)}`
                })
            }
        }
    } catch (err) {
        if (err.name === 'Forbidden') {
            return {
                statusCode: 403,
                body: JSON.stringify({message: 'Forbidden',
                    detail: err.message
                })
            }
        } else if (err.message === 'Bad Request') {
            return {
                statusCode: 400,
                body: JSON.stringify({message: 'Bad Request',
                    detail: err.message
                })
            }
        }
        
        else {
            return {
                statusCode: 500,
                body: JSON.stringify({message: `An error occurred. ${err}`})
            }
        }
    }


}

export { handler };