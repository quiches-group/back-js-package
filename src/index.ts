import Authentication from './Authentication';
import Notification from './Notification';

type QuicheStackReturn = { auth: Authentication; notification: Notification };

const QuicheStack = (privateKey: string): QuicheStackReturn => ({
    auth: new Authentication(privateKey),
    notification: new Notification(privateKey),
});

export default QuicheStack;

export { Authentication, Notification };
