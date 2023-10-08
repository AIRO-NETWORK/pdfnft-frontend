import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FloatButton } from 'antd';
import { AuthenticatedRoutesWrapper } from 'components';
import { routes, routeNames } from 'routes';
import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='flex flex-col min-h-screen bg-[url("/src/assets/img/bg.png")] bg-cover bg-center'>
      <Navbar />
      <main className='flex flex-col grow'>
        <AuthenticatedRoutesWrapper
          routes={routes}
          unlockRoute={`${routeNames.unlock}${location.search}`}
        >
          {children}
        </AuthenticatedRoutesWrapper>
      </main>
      {/* <Footer /> */}

      <FloatButton.BackTop />
    </div>
  );
};
