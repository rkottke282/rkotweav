import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda'
import { shoeboxBet, shoeboxBetSchema } from '../types/shoeboxBet';
import { ValidationResult } from 'joi';
import { addNew } from './bets';

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const email: String = event.requestContext.authorizer.lambda.email;
    const bet: ValidationResult<shoeboxBet> = shoeboxBetSchema.validate(JSON.parse(event.body));
    if (bet.error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'Bad request',
                detail: bet.error
            })
        }
    }

    const result = addNew(bet.value);

    return {
        statusCode: 200,
        body: JSON.stringify({ body: `Hello ${email}` })
    }
}

export { handler };