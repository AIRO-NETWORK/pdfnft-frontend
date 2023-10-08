import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from 'data';

const HomePage = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div
        id='home'
        className='flex flex-col md:flex-row justify-center items-center w-full max-w-[1280px] mt-[20px] md:mt-[60px]'
      >
        <div className='flex flex-col justify-center gap-[30px] w-full md:w-1/2 px-[20px] md:p-[10px]'>
          <div className='text-[35px] md:text-[80px] text-white leading-[1]'>
            <span className='font-worksans-black uppercase'>Welcome to PDFNFT.com</span>

            <div className='text-[18px] text-white font-normal mt-[20px]'>
              The Future of Document Ownership and Monetization is Here!
            </div>
          </div>

          <div className='flelx items-center w-full h-[85px] relative'>
            <div className='absolute top-0 left-0 w-[8px] h-full !bg-[linear-gradient(0deg,#CAFC01_0%,#CAFC01_100%)]'></div>

            <div className='flex items-center text-[23px] text-[#F5F2EA] opacity-60 pl-[50px] w-[500px] h-full'>
              Sign in with wallet, pay fees in EGLD, and mint PDF NFTs.
            </div>
          </div>

          <div className='flex items-center gap-[73px] mt-[20px]'>
            <div className='flex flex-col'>
              <span className='text-[16px] text-[#F5F2EA] font-bold'>Experience</span>
              <div className='text-[67px] text-[#CAFC01] font-bold leading-[120%]'>12+</div>
            </div>

            <div className='flex flex-col'>
              <span className='text-[16px] text-[#F5F2EA] font-bold'>People</span>
              <div className='text-[67px] text-[#CAFC01] font-bold leading-[120%]'>100+</div>
            </div>
          </div>

          <div className='z-10 mt-[30px]'>
            <HashLink
              smooth
              to={'/#'}
              scroll={el => scrollWithOffset(el, 110)}
              className='text-[15px] text-black font-zendots font-semibold bg-[#CAFC01] rounded-full p-[12px_26px] transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(0,0,0,.12)]'
            >
              Mint Now
            </HashLink>
          </div>
        </div>

        <div className='hidden md:flex justify-center items-center w-full md:w-1/2 p-[10px]'>
          <div className='relative w-[343px] h-[496px] rounded-[34px] bg-[#2A2B31]'>
            <div className='absolute top-[-22px] right-[-109px] w-[260px] h-[100px] rounded-[21px] bg-[#CAFC01] shadow-[0px_4px_14px_0px_rgba(202,252,1,0.74)]'></div>
            <div className='absolute bottom-[-58px] left-[-96px] w-[231px] h-[242px] rounded-[21px] bg-[linear-gradient(132deg,rgba(126,126,126,0.40)_3.01%,rgba(126,126,126,0.00)_107.67%)] backdrop-blur-[4.5px]'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home = () => (
  <HomePage />
);
