import { APIGatewayProxyEventV2WithLambdaAuthorizer, APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { shoeboxBet } from '../types/shoeboxBet';
import { addNewBet, getBet, updateBet, acceptBet, proposeResolution, acceptResolution } from './controller';

const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2WithLambdaAuthorizer<any>) => {
    try {
        const email: string = event.requestContext.authorizer.lambda.email;
        console.log('received an event: ', event);
        if (event.routeKey == 'POST /bets') {
            const bet: shoeboxBet = await addNewBet(JSON.parse(event.body), email);
            return {
                statusCode: 201,
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
            const bet: shoeboxBet = await getBet(id);
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
        } else if (event.routeKey == 'PUT /bets/{id}') {
            const id = event.pathParameters['id']
            const updatedBet: shoeboxBet = await updateBet(id, email, JSON.parse(event.body));
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "message": `Bet has been updated. UUID: ${updatedBet.id}`,
                    "data": updatedBet
                })
            }
        } else if (event.routeKey == 'POST /bets/{id}/accept') {
            const id = event.pathParameters['id']
            const acceptedBet: shoeboxBet = await acceptBet(id, email);
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "message": `Bet has been accepted. UUID: ${id}`,
                    "data": acceptedBet
                })
            }
        } else if (event.routeKey == 'POST /bets/{id}/propose-resolution') {
            const id = event.pathParameters['id']
            const bet: shoeboxBet = await proposeResolution(id, email, JSON.parse(event.body));
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "message": `Bet has been proposed as resolved. UUID: ${id}`,
                    "data": bet
                })
            }
        } else if (event.routeKey == 'POST /bets/{id}/accept-resolution') {
            const id = event.pathParameters['id']
            const bet: shoeboxBet = await acceptResolution(id, email);
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "message": `Bet has been accepted as resolve. UUID: ${id}`,
                    "data": bet
                })
            }
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({message: 'Not Found',
                    detail: 'No route found to handle this request.'
                })
            }
        }
    } catch (err) {
        if (err.name === 'Forbidden') {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 403,
                body: JSON.stringify({message: 'Forbidden',
                    detail: err.message
                })
            }
        } else if (err.name === 'Bad Request') {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: JSON.stringify({message: 'Bad Request',
                    detail: err.message
                })
            }
        } else if (err.name === 'Not Found') {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 404,
                body: JSON.stringify({message: 'Not Found',
                    detail: err.message
                })
            }
        }
        
        else {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 500,
                body: JSON.stringify({message: `An error occurred. ${err}`})
            }
        }
    }


}

export { handler };