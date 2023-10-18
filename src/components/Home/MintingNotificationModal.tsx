import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { TailSpin } from 'react-loader-spinner';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { dataDexUrls } from 'config';
import arrowUpIcon from 'assets/img/arrow_up.svg';

interface IProps {
    show: boolean;
    isMinting: boolean;
    isSuccessful: boolean;
    notificationMessage: string;
    handleShow: (status: boolean) => void
}

const MintingNotificationModal = (props: IProps) => {
    const { show, isMinting, isSuccessful, notificationMessage, handleShow } = props;
    const { network } = useGetNetworkConfig();

    const handleShowModal = (status: boolean) => {
        handleShow(status);
    };

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [show]);

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
                    <div className='relative z-[1050] flex flex-col items-center w-full max-w-full sm:max-w-[390px] bg-[#090c0e] shadow-[-1px_4px_14px_0px_rgba(126,126,126,0.74)] rounded-[10px] text-white text-center font-semibold p-[30px_35px_0px] sm:p-[30px_35px_30px]'>
                        {
                            !isMinting && (
                                <button
                                    className='hidden sm:flex justify-center items-center absolute top-0 right-0 p-[10px] cursor-pointer bg-none border-none rounded-[6px] transform hover:scale-110 transition-all'
                                    onClick={() => handleShowModal(false)}
                                >
                                    <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path d='M1 16L16 1M1 1L16 16' stroke='#BEBEBE' strokeWidth='2' />
                                    </svg>
                                </button>
                            )
                        }

                        <h1 className='text-[32px]'>Minting Status</h1>

                        <p className='w-full max-w-[200px] text-[#CAFC01]'>Please don't refresh browser or close the tab!</p>

                        <div className='flex justify-center items-center gap-[10px] mt-[20px]'>
                            <span>{notificationMessage}</span>
                            {
                                isMinting && (
                                    <TailSpin
                                        height={25}
                                        width={25}
                                        color="#ffffff"
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        strokeWidth={2}
                                    />
                                )
                            }
                        </div>

                        {
                            isSuccessful && (
                                <a
                                    target='_blank'
                                    href={`${dataDexUrls[network?.id]}/datanfts/wallet`}
                                    className='text-white underline transition-colors duration-300 hover:text-blue-500 focus:text-blue-500 active:text-blue-600 mt-[10px]'
                                >
                                    Check via DataDex
                                </a>
                            )
                        }

                        {
                            !isMinting && (
                                <button
                                    className='mt-[21px] sm:hidden'
                                    onClick={() => handleShowModal(false)}
                                >
                                    <img src={arrowUpIcon} alt='arrow-up' />
                                </button>
                            )
                        }
                    </div>
                </div>
                <div className='overlay'></div>
            </div>
        </CSSTransition>
    );
};

export default MintingNotificationModal;