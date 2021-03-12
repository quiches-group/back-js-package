import Authentication from './Authentication';

type QuicheStackReturn = { auth: Authentication };

const QuicheStack = (privateKey: string): QuicheStackReturn => ({
    auth: new Authentication(privateKey),
});

export default QuicheStack;

export { Authentication };
