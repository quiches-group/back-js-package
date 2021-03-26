import axios from 'axios';
import atob from 'atob';

export type PayloadType = {
    _id: string;
    appid: string;
    iat: string;
    exp: string;
}

export type User = {
    _id: string;
    mail: string;
    firstname: string;
    lastname: string;
    applicationId: string;

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

     getUsers = async (search: string|null = null): Promise<User[]> => {
         const config = {
             headers: {
                 'Content-Type': 'application/json',
             },
             method: 'GET',
             url: !search
                 ? this.injectPrivateKey('/application-users/private-key/')
                 : `${hostname}/application-users/private-key/?search=${search}&privateKey=${this.privateKey}`,
         };
         try {
             // @ts-ignore
             const result = await axios(config);

             if (result.status !== 200) {
                 throw new Error();
             }
             return result.data;
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
