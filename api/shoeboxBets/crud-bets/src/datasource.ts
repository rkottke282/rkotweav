import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { shoeboxBet, shoeboxBetSchema } from "../types/shoeboxBet"
import { DynamoDBClient, GetItemCommand, GetItemCommandInput, PutItemCommand, PutItemCommandInput, ResourceNotFoundException, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb"; // ES Modules import

const client = new DynamoDBClient({region: 'us-east-1'});
const TABLE = 'shoeboxBets';

export const addBet = async (bet: shoeboxBet): Promise<shoeboxBet> => {
    const input: PutItemCommandInput = {
        TableName: TABLE,
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

export const getBet = async (id: string): Promise<shoeboxBet> => {
    const input: GetItemCommandInput = {
        TableName: TABLE,
        Key: { "id": {
            "S": id
        }}
    }

    const command = new GetItemCommand(input);
    try {
        const response = await client.send(command);
        if (response.Item == null) {
            throw new Error("Not Found")
        }
        return unmarshall(response.Item) as any as shoeboxBet;
   } catch (error) {
        if (error.message == "Not Found") throw error;
        console.error(`Error retrieving bet from DynamoDB: ${error}`);
        throw error;
    }
}
