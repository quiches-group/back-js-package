import axios from 'axios';

type SendNotificationParameters = {
    userIds: string[];
    body: string;
    title: string;
    payload?: Record<string, string|number>;
    threadId?: string;
    expiry?: number;
};

const hostname = 'https://notiches.quiches.ovh';

class Notification {
    private readonly privateKey: string;

    constructor(privateKey: string) {
        this.privateKey = privateKey;
    }

    private injectPrivateKey(url: string): string {
        return `${hostname}${url}?privateKey=${this.privateKey}`;
    }

    sendNotification = async (data: SendNotificationParameters): Promise<void> => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data,
            method: 'POST',
            url: this.injectPrivateKey('/notification'),
        };

        try {
            // @ts-ignore
            const result = await axios(config);

            if (result.status !== 201) {
                throw new Error();
            }
        } catch (e) {
            throw new Error();
        }
    }
}

export default Notification;
