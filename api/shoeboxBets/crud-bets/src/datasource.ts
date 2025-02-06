import { marshall } from "@aws-sdk/util-dynamodb";
import { shoeboxBet, shoeboxBetSchema } from "../types/shoeboxBet"
import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb"; // ES Modules import

const client = new DynamoDBClient({region: 'us-east-1'});

export const addBet = async (bet: shoeboxBet): Promise<shoeboxBet> => {
    const input: PutItemCommandInput = {
        TableName: 'shoeboxBets',
        Item: marshall(bet)
    };
    const command = new PutItemCommand(input)
    try {
        const response = await client.send(command);
        console.log("Item added:", response);
      } catch (error) {
        console.error("Error inserting to DynamoDB: ", error);
        throw error;
      }
    return bet;
}