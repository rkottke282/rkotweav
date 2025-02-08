import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { shoeboxBet } from '../types/shoeboxBet';
import { addNew, get } from './controller';

const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2WithLambdaAuthorizer<any>) => {
    try {
        const email: string = event.requestContext.authorizer.lambda.email;
        console.log('received an event: ', event);
        if (event.routeKey == 'POST /bets') {
            const bet: shoeboxBet = await addNew(event.body, email);
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "message": `Bet has been created. UUID: ${bet.id}`,
                    "data": bet
                })
            }
        } else if (event.routeKey == 'GET /bets/{id}') {
            const id = event.pathParameters['id']
            const bet: shoeboxBet = await get(id);
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "message": `Bet successfully retrieved.`,
                    "data": bet
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
        } else if (err.message === 'Not Found') {
            return {
                statusCode: 404,
                body: JSON.stringify({message: 'Not Found',
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