import axios from 'axios';
import atob from 'atob';

export type PayloadType = {
    _id: string;
    appid: string;
    iat: string;
    exp: string;
}

const hostname = 'https://sso.quiches.ovh';

class Authentication {
    private readonly privateKey: string;

    constructor(privateKey: string) {
        this.privateKey = privateKey;
    }

    private injectPrivateKey(url: string): string {
        return `${hostname}${url}?privateKey=${this.privateKey}`;
    }

    verifyToken = Authentication.verifyToken;

    static verifyToken = async (token: string): Promise<void> => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: { token },
            method: 'POST',
            url: `${hostname}/application-users/verify-token`,
        };

        try {
            // @ts-ignore
            const result = await axios(config);

            if (result.status !== 203) {
                throw new Error();
            }
        } catch (e) {
            throw new Error();
        }
    }

    getPayload = Authentication.getPayload;

    static getPayload = (token: string): PayloadType => {
        const splitedToken = token.split('.');
        const encodedPayload = splitedToken[1];
        const jsonPayload = atob(encodedPayload);

        return JSON.parse(jsonPayload);
    }
}

export default Authentication;
