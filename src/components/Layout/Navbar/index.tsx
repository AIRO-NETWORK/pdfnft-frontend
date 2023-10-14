import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { SignedMessageStatusesEnum } from '@multiversx/sdk-dapp/types';
import { logout } from 'helpers';
import {
  useGetAccountInfo,
  useGetIsLoggedIn,
  useGetLastSignedMessageSession,
  useSignMessage
} from 'hooks';
import { routeNames } from 'routes';
import { navbarItems, scrollWithOffset } from 'data';
import { CombinedReducer } from 'store';
import { User } from 'interfaces/User';
import { Sockets } from 'reducers/sockets';
import logoImg from 'assets/img/logo.png';

// let flag = false;
let isSigningMessage = false;
const messageToSign = 'Welcome to PDFNFT.com';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { address } = useGetAccountInfo();
  const { signMessage, onAbort } = useSignMessage();
  const signedMessageInfo = useGetLastSignedMessageSession();
  const isLoggedIn = useGetIsLoggedIn();

  const user = useSelector<CombinedReducer, User>((state) => state.user);
  const sockets = useSelector<CombinedReducer, Sockets>((state) => state.sockets);

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
    } catch { }
    dispatch({ type: 'LOAD_USER', payload: null });

    await logout(`${window.location.origin}/unlock`);
  };

  const handleLogin = () => {
    navigate(routeNames.unlock);
  };

  useEffect(() => {
    if (!(sockets && sockets.user)) return;

    if (user?._id) {
      sockets.user.emit('subscribeToProfile', user._id);
    }
  }, [sockets?.user, user?._id]);

  useEffect(() => {
    const login = async () => {
      if (address && signedMessageInfo && signedMessageInfo.status == SignedMessageStatusesEnum.signed) {
        try {
          const authState = (await axios.get('/api/auth/state')).data;
          let user = authState.user;
          if (authState.authenticated) {
            if (user.address === address) {
              dispatch({ type: 'LOAD_USER', payload: user });
              return;
            }
            console.log('ADDRESSES ARE NOT THE SAME!');
            await axios.get('/api/auth/logout');
            dispatch({ type: 'LOAD_USER', payload: null });
            onAbort();
          }

          console.log('signedMessageInfo', signedMessageInfo);

          user = (
            await axios.post(
              '/api/auth/login',
              {
                address: address,
                signature: signedMessageInfo.signature,
              },
              { withCredentials: true }
            )
          ).data;

          console.log('===========', user);

          dispatch({ type: 'LOAD_USER', payload: user });

          onAbort();
        } catch (e: any | AxiosError) {
          if (axios.isAxiosError(e)) {
            toast.error(e?.response?.data?.message?.toString());
          } else {
            toast.error('Failed to login');
          }

          onAbort();
          console.log(e);
        }
      }
    };

    login();
  }, [address, signedMessageInfo]);

  useEffect(() => {
    const checkAuthAndSign = async () => {
      if (isSigningMessage) {
        return;
      }

      if (address) {
        isSigningMessage = true;

        try {
          const { authenticated, user } = (await axios.get('/api/auth/state')).data;
          console.log('authenticated', authenticated);
          console.log('user', user);
          console.log('address', address);
          if (authenticated) {
            if (user.address === address) {
              dispatch({ type: 'LOAD_USER', payload: user });
              return;
            }
            console.log('ADDRESSES ARE NOT THE SAME!');
            await axios.get('/api/auth/logout');
            dispatch({ type: 'LOAD_USER', payload: null });
            onAbort();
          }

          if (signedMessageInfo) {
            onAbort();
          }

          await signMessage({
            message: messageToSign,
            callbackRoute: window.location.href
          });
        } catch (e: any | AxiosError) {
          if (axios.isAxiosError(e)) {
            toast.error(e?.response?.data?.message?.toString());
          } else {
            toast.error('Failed to login');
          }

          onAbort();
          console.log(e);
        }

        isSigningMessage = false;
      }
    };

    checkAuthAndSign();
  }, [address]);

  return (
    <nav className='sticky top-0 right-0 z-30 flex justify-between items-center h-[80px] md:h-[92px] backdrop-blur-[4.5px]'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='flex justify-between items-center w-full max-w-[1280px] h-full px-[20px] md:px-[10px]'>
          <div className='h-[42px] md:h-[52px]'>
            <a href={routeNames.home}>
              <img src={logoImg} alt='logo' className='h-full' />
            </a>
          </div>

          <div className='flex justify-end items-center text-white'>
            <div className='hidden xl:flex items-center gap-[10px] p-[7.5px_31px] h-[70px]'>
              {
                navbarItems.map((item, index) => {
                  return (
                    <HashLink
                      smooth
                      key={index}
                      to={item.to}
                      className='flex justify-center items-center text-[16px] font-zendots p-[10px_15px]'
                      scroll={el => scrollWithOffset(el, 110)}
                    >
                      {item.title}
                    </HashLink>
                  );
                })
              }
            </div>

            <button
              className='text-[14px] md:text-[15px] text-[#0C0C0C] font-zendots font-semibold bg-[#CAFC01] rounded-full p-[8px_12px] md:p-[12px_22px] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(0,0,0,.12)]'
              onClick={isLoggedIn ? handleLogout : handleLogin}
            >
              {
                isLoggedIn ? (
                  'Disconnect'
                ) : (
                  'Connect wallet'
                )
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
