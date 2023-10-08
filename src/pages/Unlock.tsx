import React from 'react';
import {
  AuthRedirectWrapper,
  ExtensionLoginButton,
  LedgerLoginButton,
  OperaWalletLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from 'components';
import { routeNames } from 'routes';

const UnlockPage = () => {
  const commonProps = {
    callbackRoute: routeNames.home,
    nativeAuth: true // optional
  };

  return (
    <div className='flex justify-center items-center w-full min-h-[calc(100vh-470px)] py-[72px]'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='rounded-[12px] shadow-[0_0.5rem_1.8rem_#18191a] p-[50px_40px] border-none'>
          <h3 className='text-[24px] text-white font-bold leading-[1.2] connect-wallet-title mb-[10px]'>CONNECT WALLET</h3>
          <p className='text-white text-center mb-[20px]'>Connect with your Elrond Wallet.<br />Select your login method:</p>

          <div className='flex flex-col justify-center items-center gap-[10px]'>
            <ExtensionLoginButton
              loginButtonText='MultiversX DeFi Wallet'
              {...commonProps}
              className='w-full !text-[15px] !font-medium bg-[linear-gradient(180deg,#FFCA3E_0%,#FF573B_100%)] !p-[9px_22px] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(0,0,0,.12)] !border-none clip-path'
            />

            <OperaWalletLoginButton
              loginButtonText='Opera Crypto Wallet - Beta'
              {...commonProps}
              className='w-full !text-[15px] !font-medium bg-[linear-gradient(180deg,#FFCA3E_0%,#FF573B_100%)] !p-[9px_22px] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(0,0,0,.12)] !border-none clip-path'
            />

            <WebWalletLoginButton
              loginButtonText='MultiversX Web Wallet'
              data-testid='webWalletLoginBtn'
              {...commonProps}
              className='w-full !text-[15px] !font-medium bg-[linear-gradient(180deg,#FFCA3E_0%,#FF573B_100%)] !p-[9px_22px] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(0,0,0,.12)] !border-none clip-path'
            />
            <LedgerLoginButton
              loginButtonText='Ledger'
              className='test-class_name w-full !text-[15px] !font-medium bg-[linear-gradient(180deg,#FFCA3E_0%,#FF573B_100%)] !p-[9px_22px] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(0,0,0,.12)] !border-none clip-path'
              {...commonProps}
            />
            <WalletConnectLoginButton
              loginButtonText='xPortal App'
              {...commonProps}
              className='w-full !text-[15px] !font-medium bg-[linear-gradient(180deg,#FFCA3E_0%,#FF573B_100%)] !p-[9px_22px] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(0,0,0,.12)] !border-none clip-path'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Unlock = () => (
  <AuthRedirectWrapper>
    <UnlockPage />
  </AuthRedirectWrapper>
);
