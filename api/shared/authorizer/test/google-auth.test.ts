import { describe, expect, it } from "@jest/globals";
import { getTokenInfo } from '../src/google-auth';

describe('getTokenInfo', () => {
    it('should get undefined on an invalid token', async () => {
        const token = 'ya29.a0ARW5m77PoF1kFTEwbG1CaYyd_tlB675PJctdIjY6i_IIDn8B3mSVUrfvUOrEUj5HIXlw9_REusUHd1XVQZZyLfwUFGHeD6kKG4O26tBdSzgpqv2uAkcOXjIsd5AYhgHZpVSTefprQxkM_dDZOo266ipWTD0n9Ah9hMMaCgYKAXoSARMSFQHGX2Mic4ezmtVy4De556dyi_-LdA0170';
        const tokenInfo = await getTokenInfo(token);
        expect(tokenInfo).toBeFalsy();
    })

    it('should get a token info on a valid token', async () => {
        // put a good token in this variable
        const token = 'ya29.a0ARW5m77wwy0EjVfx-OKGhgaRJE-BKfnfdPq-_HExYIW0toFR_-PGJ4kYjmuETaSetJfa_lQnBVFBZ5v2n_T_jqk5cLuP_Sz42Lm9-_pCNBe7mVvglPqSCa5yNhyDeqYIYm7vKspwa8Jc4aMglwVPRzRatjxw7HogxTMaCgYKAUgSARMSFQHGX2Mih13W2xDuy23-82my4dmivw0170';
        const tokenInfo = await getTokenInfo(token);
        expect(tokenInfo).toBeTruthy();
        expect(tokenInfo?.email).toBeTruthy();
    })
})