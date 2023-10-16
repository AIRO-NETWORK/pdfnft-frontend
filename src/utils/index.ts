import BigNumber from 'bignumber.js/bignumber.js';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';

export const useContractInteractor = () => {
    const callMethod = async ({ tx }: any) => {
        await refreshAccount();

        const { sessionId } = await sendTransactions({
            transactions: tx,
            transactionsDisplayInfo: {
                processingMessage: 'Processing Ping transaction',
                errorMessage: 'An error has occured during Ping',
                successMessage: 'Ping transaction successful'
            },
            redirectAfterSign: false
        });

        return sessionId;
    };

    return { callMethod };
};

export const convertEsdtToWei = async (v: number, decimals = 18) => {
    const factor = Math.pow(10, decimals);
    return (new BigNumber(v)).multipliedBy(factor);
};