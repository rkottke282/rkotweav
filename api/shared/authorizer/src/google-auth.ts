import { OAuth2Client, TokenInfo } from "google-auth-library"

export const getTokenInfo = async (token: string): Promise<TokenInfo | undefined> => {
    const CLIENT_ID_GOOGLE = 'yourGoogleClientId'

    const client = new OAuth2Client(CLIENT_ID_GOOGLE)

    try {
        return await client.getTokenInfo(token);
    } catch(err) {
        console.log('Error decoding token: ', err);
    }
    return undefined;
}