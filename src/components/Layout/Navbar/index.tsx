import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { logout } from 'helpers';
import { useGetIsLoggedIn } from 'hooks';
import { routeNames } from 'routes';
import { navbarItems, scrollWithOffset } from 'data';
import logoImg from 'assets/img/logo.png';

export const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  const handleLogin = () => {
    navigate(routeNames.unlock);
  };

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
            <div className="hidden xl:flex items-center gap-[10px] p-[7.5px_31px] h-[70px]">
              {
                navbarItems.map((item, index) => {
                  return (
                    <HashLink
                      smooth
                      key={index}
                      to={item.to}
                      className="flex justify-center items-center text-[16px] font-zendots p-[10px_15px]"
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
