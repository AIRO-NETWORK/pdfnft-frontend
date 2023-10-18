export const dAppName = 'PDFNFT';

// Generate your own WalletConnect 2 ProjectId here: https://cloud.walletconnect.com/app
export const walletConnectV2ProjectId = '9b1a9564f91cb659ffe21b73d5c4e2d8';

export const apiTimeout = 6000;
export const transactionSize = 15;
export const TOOLS_API_URL = 'https://tools.multiversx.com';
/**
 * Calls to these domains will use `nativeAuth` Baerer token
 */
export const sampleAuthenticatedDomains = [TOOLS_API_URL];

export const apiAddresses: { [k: string]: string } = {
    'mainnet': 'https://api.multiversx.com',
    'devnet': 'https://devnet-api.multiversx.com'
};

export const gatewayAddresses: { [k: string]: string } = {
    'mainnet': 'https://gateway.multiversx.com',
    'devnet': 'https://devnet-gateway.multiversx.com'
};

export const explorers: { [k: string]: string } = {
    'mainnet': 'https://explorer.multiversx.com',
    'devnet': 'https://devnet-explorer.multiversx.com'
};

export const dataDexUrls: { [k: string]: string } = {
    'mainnet': 'https://datadex.itheum.io',
    'devnet': 'https://test.datadex.itheum.io'
};

export const usdcTokenIds: { [k: string]: string } = {
    'mainnet': 'USDC-c76f1f',
    'devnet': 'USDC-787051'
};

export const mintingFee = 50;