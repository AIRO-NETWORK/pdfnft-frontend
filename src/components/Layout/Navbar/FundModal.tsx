import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { ThreeDots } from 'react-loader-spinner';
import {
    ArgSerializer,
    BigUIntValue,
    BytesValue,
    TransactionPayload,
    TypedValue,
} from '@multiversx/sdk-core/out';
import { useGetNetworkConfig, useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { CombinedReducer } from 'store';
import { User } from 'interfaces/User';
import { Sockets } from 'reducers/sockets';
import { convertEsdtToWei, useContractInteractor } from 'utils';
import arrowUpIcon from 'assets/img/arrow_up.svg';
import axios from 'axios';
import { explorers, usdcTokenIds } from 'config';

enum FundTypeEnum {
    Deposit,
    Withdraw
}

enum DepositStatusEnum {
    None,
    Sent,
    Validated
}

enum WithdrawStatusEnum {
    None,
    Withdrawing,
    Withdrawn,
    Unknown
}

interface IProps {
    show: boolean;
    handleShow: (status: boolean) => void
}

const serverWallet = process.env.REACT_APP_SERVER_WALLET_ADDRESS;

const FundModal = (props: IProps) => {
    const { show, handleShow } = props;
    const { network } = useGetNetworkConfig();
    const { callMethod } = useContractInteractor();
    const [fundType, setFundType] = useState<FundTypeEnum>(FundTypeEnum.Deposit);
    const [amount, setAmount] = useState<number | null>(0);
    const [withdrawStatus, setWithdrawStatus] = useState(WithdrawStatusEnum.None);
    const [withdrawTxHash, setWithdrawTxHash] = useState('');
    const [isWithdrawTimerStarted, setIsWithdrawTimerStarted] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [depositStatus, setDepositStatus] = useState(DepositStatusEnum.None);
    const [sessionId, setSessionId] = useState<string>('');

    const user = useSelector<CombinedReducer, User>((state) => state.user);
    const sockets = useSelector<CombinedReducer, Sockets>((state) => state.sockets);

    useTrackTransactionStatus({
        transactionId: sessionId,
        onCancelled: (_) => {
            setDepositStatus(DepositStatusEnum.None);
            setWithdrawStatus(WithdrawStatusEnum.None);
        },
        onFail: (_) => {
            setDepositStatus(DepositStatusEnum.None);
            setWithdrawStatus(WithdrawStatusEnum.None);
        },
    });

    const deposit = async () => {
        if (!user?.address) {
            return toast.warn('Please connect wallet or refresh browser!');
        }

        if (!amount) {
            return toast.warn('Invalid amount!');
        }

        if (amount < 50) {
            return toast.warn('Minimum deposit amount is 50!');
        }

        setDepositStatus(DepositStatusEnum.Sent);

        const convertedValue = await convertEsdtToWei(amount, 6);
        const args: TypedValue[] = [
            BytesValue.fromUTF8(usdcTokenIds[network?.id]),
            new BigUIntValue(convertedValue.valueOf()),
        ];
        const { argumentsString } = new ArgSerializer().valuesToString(args);
        const data = new TransactionPayload(`ESDTTransfer@${argumentsString}`);
        const tx = {
            value: 0,
            data: data.toString(),
            receiver: serverWallet,
            gasLimit: 100000000
        };

        const sessionId = await callMethod({ tx: tx });
        setSessionId(sessionId);
        console.log('sessionId', sessionId);
    };

    const withdraw = async () => {
        if (!user?.address) {
            return toast.warn('Please connect wallet or refresh browser!');
        }

        if (!amount || amount < 0) {
            return toast.warn('Invalid amount!');
        }

        if (amount < 10) {
            return toast.warn('Minimum withdraw amount is 10!');
        }

        if (amount > user?.usdcBalance) {
            return toast.warn('Insufficient USDC balance');
        }

        setWithdrawStatus(WithdrawStatusEnum.Withdrawing);
        setIsWithdrawTimerStarted(true);
        setSeconds(60);

        try {
            const txHash = (await axios.post('/api/u/withdraw', { amount })).data;
            setWithdrawTxHash(txHash);
            setWithdrawStatus(WithdrawStatusEnum.Withdrawn);
        } catch (e) {
            console.log('error in withdrawing', e);
            setWithdrawStatus(WithdrawStatusEnum.None);
        }
    };

    const handleFund = async () => {
        if (fundType == FundTypeEnum.Deposit) {
            await deposit();
        } else {
            await withdraw();
        }
    };

    const inputAmount = (input: string) => {
        if (!input) return setAmount(null);

        if (Number(input) >= 0) setAmount(Number(input));
        else setAmount(0);
    };

    const onCompleteTimer = () => {
        if (isWithdrawTimerStarted) {
            if (withdrawStatus !== WithdrawStatusEnum.Withdrawn) {
                setWithdrawStatus(WithdrawStatusEnum.Unknown);
            }
        }
    };

    const handleShowModal = (status: boolean) => {
        setDepositStatus(DepositStatusEnum.None);
        setWithdrawStatus(WithdrawStatusEnum.None);
        handleShow(status);
    };

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [show]);


    useEffect(() => {
        let myInterval: any;

        if (isWithdrawTimerStarted) {
            myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }

                if (seconds == 0) {
                    clearInterval(myInterval);
                    onCompleteTimer();
                }
            }, 1000);
        } else {
            clearInterval(myInterval);
        }

        return () => {
            clearInterval(myInterval);
        };
    }, [seconds]);

    useEffect(() => {
        if (!(sockets && sockets.user)) return;

        sockets.user.on('balanceChange', (_amount: number, fromDeposit: boolean) => {
            if (fromDeposit) {
                setDepositStatus(DepositStatusEnum.Validated);
            }
        });
    }, [sockets]);

    return (
        <CSSTransition
            in={show}
            timeout={300}
            unmountOnExit
        >
            <div
                className='fixed top-0 left-0 right-0 bottom-0 h-screen opacity-100 transition-[opacity_linear_150ms] sm:bg-black/50 z-[1040] overflow-y-auto hidden justify-center'
                style={{ display: show ? 'flex' : 'none' }}
            >
                <div className='flex m-0 sm:m-4 w-full min-h-[calc(100vh-6rem)] justify-center items-start sm:items-center'>
                    <div className='relative z-[1050] flex flex-col items-center w-full max-w-full sm:max-w-fit bg-[#090c0e] shadow-[-1px_4px_14px_0px_rgba(126,126,126,0.74)] rounded-[10px] text-white text-center font-semibold p-[30px_35px_0px] sm:p-[50px_35px_30px]'>
                        <button
                            className='hidden sm:flex justify-center items-center absolute top-0 right-0 p-[10px] cursor-pointer bg-none border-none rounded-[6px] transform hover:scale-110 transition-all'
                            onClick={() => handleShowModal(false)}
                        >
                            <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M1 16L16 1M1 1L16 16' stroke='#BEBEBE' strokeWidth='2' />
                            </svg>
                        </button>

                        <div>
                            <div className='flex justify-center items-center w-full'>
                                <button
                                    className={`fund-modal-tab-item w-[160px] h-[61px] text-[18px] font-medium ${fundType == FundTypeEnum.Deposit ? 'active' : ''}`}
                                    onClick={() => setFundType(FundTypeEnum.Deposit)}
                                >
                                    Deposit
                                </button>

                                <button
                                    className={`fund-modal-tab-item w-[160px] h-[61px] text-[18px] font-medium ${fundType == FundTypeEnum.Withdraw ? 'active' : ''}`}
                                    onClick={() => setFundType(FundTypeEnum.Withdraw)}
                                >
                                    Withdraw
                                </button>
                            </div>

                            <input
                                autoFocus
                                type={'number'}
                                disabled={depositStatus !== DepositStatusEnum.None || withdrawStatus !== WithdrawStatusEnum.None}
                                className='bg-[#1D262F] rounded-[10px] w-full mt-[35px] h-[37px] text-[18px] font-medium pl-[19px] outline-none'
                                value={amount === null ? '' : amount}
                                onChange={(e) => inputAmount((e.target as HTMLInputElement).value)}
                            />
                        </div>

                        {
                            fundType === FundTypeEnum.Deposit ? (
                                depositStatus === DepositStatusEnum.None ? (
                                    <button
                                        className='bg-[#CAFC01] shadow-[0px_4px_14px_0px_rgba(202,252,1,0.74)] rounded-full text-black w-[120px] h-[40px] text-[20px] font-medium mt-[35px] transition duration-300 hover:transform hover:scale-110 opacity-100'
                                        onClick={handleFund}
                                    >
                                        Confirm
                                    </button>
                                ) : depositStatus === DepositStatusEnum.Sent ? (
                                    <button className='flex justify-center items-center gap-[8px] h-[40px] text-[20px] cursor-default font-medium mt-[35px]'>
                                        Validating <ThreeDots width={28} height={28} color='#ffffff' />
                                    </button>
                                ) : depositStatus === DepositStatusEnum.Validated ? (
                                    <button className='h-[40px] text-[20px] cursor-default font-medium mt-[35px]'>
                                        <h3 className='status text-[#CAFC01] font-bold'>Successfully Validated</h3>
                                    </button>
                                ) : (
                                    <button className='h-[40px] text-[20px] cursor-default font-medium mt-[35px]'>Failed</button>
                                )
                            ) : (
                                withdrawStatus === WithdrawStatusEnum.None ? (
                                    <button
                                        className='bg-[#CAFC01] shadow-[0px_4px_14px_0px_rgba(202,252,1,0.74)] rounded-full text-black w-[120px] h-[40px] text-[20px] font-medium mt-[35px] transition duration-300 hover:transform hover:scale-110 opacity-100'
                                        onClick={handleFund}
                                    >
                                        Confirm
                                    </button>
                                ) : withdrawStatus === WithdrawStatusEnum.Withdrawing ? (
                                    <div className='mt-[35px] font-medium'>
                                        <h3>{`Withdrawing: ${amount} USDC`}</h3>
                                        <button disabled className='flex justify-center items-center gap-[8px] mt-5 bg-[#CAFC01] shadow-[0px_4px_14px_0px_rgba(202,252,1,0.74)] rounded-full text-black px-[25px] h-[40px] text-[20px] cursor-default font-medium'>
                                            <span className='withdrawLabel'>Confirming...</span>{' '}
                                        </button>
                                    </div>
                                ) : withdrawStatus === WithdrawStatusEnum.Withdrawn ? (
                                    <div className='mt-[35px] font-medium status text-[#CAFC01]'>
                                        <strong>
                                            <h2 className='mb-6 '>
                                                {`Successfully Withdrawn: ${amount} USDC`}
                                            </h2>
                                        </strong>
                                        <a
                                            target='_blank'
                                            href={`${explorers[network?.id]}/transactions/${withdrawTxHash}`}
                                            className='text-white underline transition-colors duration-300 hover:text-blue-500 focus:text-blue-500 active:text-blue-600'
                                        >
                                            Check via Explorer
                                        </a>
                                    </div>
                                ) : withdrawStatus === WithdrawStatusEnum.Unknown ? (
                                    <div className='mt-[35px] font-medium'>
                                        <h3>Please check your transactions.</h3>
                                        <h3>Open a ticket if you require support</h3>
                                    </div>
                                ) : (
                                    <h3 className='mt-[35px] font-medium'>Failed</h3>
                                )
                            )
                        }

                        <button
                            className='mt-[21px] sm:hidden'
                            onClick={() => handleShowModal(false)}
                        >
                            <img src={arrowUpIcon} alt='arrow-up' />
                        </button>
                    </div>
                </div>
                <div className='overlay'></div>
            </div>
        </CSSTransition>
    );
};

export default FundModal;