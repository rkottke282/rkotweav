import { OAuth2Client, TokenInfo } from "google-auth-library"

const CLIENT_ID: string = '484680450142-kcatfskg0bfr84cvgkjg3933v4pu96qn.apps.googleusercontent.com';

export const getTokenInfo = async (token: string): Promise<TokenInfo | undefined> => {
    const client = new OAuth2Client(CLIENT_ID);

    try {
        return await client.getTokenInfo(token);
    } catch(err) {
        console.log('Error decoding token: ', err);
    }
    return undefined;
}