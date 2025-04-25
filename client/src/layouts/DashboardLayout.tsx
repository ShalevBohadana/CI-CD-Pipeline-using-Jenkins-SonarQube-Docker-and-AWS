import { Outlet, ScrollRestoration } from 'react-router-dom';

import { ExtendHead } from '../components/ExtendHead';
import { useDefaultDashboardRedirect } from '../hooks/useDefaultDashboardRedirect';
import { DESKTOP_SCREEN, useMatchMedia } from '../hooks/useMatchMedia';
import { DashboardProvider } from '../pages/Dashboard/components/DashboardProvider';
import { Navbar } from '../components/layout/Navbar';
import { DiscordServerInvite } from '../components/DiscordServerInvite';

import { lazilyLoadable } from '../utils/lazilyLoadable';

const { DashboardSidebar } = lazilyLoadable(
  () => import('../pages/Dashboard/components/DashboardSidebar')
);

export const DashboardLayout = () => {
  useDefaultDashboardRedirect();
  const isDesktop = useMatchMedia(DESKTOP_SCREEN); // 1280px

  return (
    <DashboardProvider>
      <ScrollRestoration />
      <ExtendHead title='Dashboard' description='Dashboard page' />
      <Navbar />

      <div className='min-h-screen '>
        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            {/* Main content */}
            <div className='lg:col-span-9'>
              <div className='w-full h-full grid xl:grid-cols-[min(100%,16rem)_1fr] gap-4 xl:h-[calc(100dvh-97px)]'>
                {isDesktop ? (
                  <aside className='relative isolate overflow-auto h-[inherit] z-0'>
                    <DashboardSidebar />
                    <hr className='hidden xl:block border-none bg-fading-theme-gradient-25 [--angle:100deg] absolute w-px h-full rotate-180 -z-10 right-0 bottom-0' />
                  </aside>
                ) : null}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};
