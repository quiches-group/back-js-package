import axios from 'axios';
import atob from 'atob';

export type PayloadType = {
    _id: string;
    appid: string;
    iat: string;
    exp: string;
}

class Authentication {
    private readonly hostname = 'https://sso.quiches.ovh/api/application-users';

    private readonly privateKey: string;

    constructor(privateKey: string) {
        this.privateKey = privateKey;
    }

    private injectPrivateKey(url: string): string {
        return `${url}?privateKey=${this.privateKey}`;
    }

    verifyToken = async (token: string): Promise<void> => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: { token },
            method: 'POST',
            url: this.injectPrivateKey(`${this.hostname}/verify-token`),
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

    getPayload = (token: string): PayloadType => {
        const splitedToken = token.split('.');
        const encodedPayload = splitedToken[1];
        const jsonPayload = atob(encodedPayload);

        return JSON.parse(jsonPayload);
    }
}

export default Authentication;
