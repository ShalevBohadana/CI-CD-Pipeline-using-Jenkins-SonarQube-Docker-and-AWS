import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer } from '../pages/shared/Footer';
import { Navbar } from '../components/layout/Navbar';

const RootLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <ScrollRestoration />
      <Navbar />

      {/* Main content area */}
      <main className='flex-grow w-full pt-20'>
        {/* pt-20 accounts for the navbar height (h-20) */}
        <div className='min-h-[calc(100vh-5rem)] xl:min-h-[calc(100vh-8rem)] w-full'>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
