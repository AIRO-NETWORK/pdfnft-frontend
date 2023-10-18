import BigNumber from 'bignumber.js/bignumber.js';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { NFTStorage } from 'nft.storage';

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

export const convertEsdtToWei = async (v: number, decimals = 18): Promise<BigNumber> => {
    const factor = Math.pow(10, decimals);
    return (new BigNumber(v)).multipliedBy(factor);
};

/**
 * Uploads the given metadata to IPFS using NFT.Storage.
 * @param {string} name - The name of the given NFT.
 * @param {string} description - The description of the given NFT.
 * @param {File} imageFile - The file to be uploaded to IPFS.
 * @returns {Promise<string>} - A promise that resolves with the CID of the uploaded file.
 */
export const uploadMetadataToIPFS = async (
    name: string,
    description: string,
    imageFile: File
): Promise<string | undefined> => {
    const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API_KEY ?? '' });

    const metadata = await client.store({
        name: name,
        description: description,
        image: imageFile
    });

    if (metadata) {
        const href = metadata?.data?.image?.href?.split('//')[1];
        return `https://${href.split('/')[0]}.ipfs.nftstorage.link/${href.split('/')[1]}`;
    } else {
        return;
    }
};