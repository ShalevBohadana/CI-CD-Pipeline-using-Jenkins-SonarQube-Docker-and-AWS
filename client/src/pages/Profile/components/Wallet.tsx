import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from '../../../components/tabs/TabsWrapper';

import { useVerifyBalanceRechargeMutation } from '../../../redux/features/wallet/walletApi';
import { lazilyLoadable } from '../../../utils/lazilyLoadable';

const { WalletOverviewTabContent } = lazilyLoadable(() => import('./WalletOverviewTabContent'));
const { WalletDepositTabContent } = lazilyLoadable(() => import('./WalletDepositTabContent'));
const { WalletWithdrawalTabContent } = lazilyLoadable(() => import('./WalletWithdrawalTabContent'));

type TWalletContext = {
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
  isDemoMode: boolean;
  setIsDemoMode: Dispatch<SetStateAction<boolean>>;
};

export const WalletContext = createContext<TWalletContext | undefined>(undefined);

export const Wallet = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const walletContextValue = useMemo(() => {
    return {
      tabIndex,
      setTabIndex,
      isDemoMode,
      setIsDemoMode,
    };
  }, [tabIndex, setTabIndex, isDemoMode, setIsDemoMode]);

  const { search } = useLocation();
  const sessionId = new URLSearchParams(search).get('session_id');
  const [verifyPayment] = useVerifyBalanceRechargeMutation();
  const isProcessing = useRef(true);

  useEffect(() => {
    if (sessionId && isProcessing.current === true && !isDemoMode) {
      const sessionData = async () => {
        await verifyPayment({ sessionId }).unwrap();
      };

      sessionData().catch((err) => {
        console.log(err);
      });
      isProcessing.current = false;
    }
  }, [verifyPayment, sessionId, isDemoMode]);

  return (
    <WalletContext.Provider value={walletContextValue}>
      <div>
        <div className=''>
          <div className='flex justify-end px-4 py-2'>
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className='text-sm text-brand-primary-color-1 hover:text-brand-primary-color-light transition-colors'
            >
              {isDemoMode ? 'Switch to Real Mode' : 'Switch to Demo Mode'}
            </button>
          </div>

          {isDemoMode && (
            <div className='max-w-sm mx-auto px-4 mb-4'>
              <div className='bg-brand-primary-color-1/[0.1] border border-brand-primary-color-1/[0.2] rounded-xl p-4'>
                <p className='text-white/80 text-sm text-center'>
                  Demo Mode Active - No real transactions will be processed
                </p>
              </div>
            </div>
          )}
          <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList className='relative isolate z-0 flex justify-between items-center gap-2 font-oxanium text-lg xl:text-2xl leading-none font-medium max-w-sm mx-auto px-2 py-8 xl:py-12'>
              {['Overview', 'Deposit', 'Withdrawal'].map((label, idx) => (
                <Tab
                  key={`wallet-tab-${idx + 1}`}
                  className='relative isolate z-0 outline-none py-1 line-clamp-1 inline-flex justify-center text-center xl:min-w-[7rem] text-white aria-selected:text-brand-primary-color-1 aria-selected:underline aria-selected:underline-offset-4 transition-all cursor-pointer hover:text-brand-primary-color-light select-none capitalize'
                >
                  {label}
                </Tab>
              ))}
            </TabList>

            {/* Overview */}
            <TabPanel>{tabIndex === 0 ? <WalletOverviewTabContent /> : null}</TabPanel>

            {/* Deposit */}
            <TabPanel>{tabIndex === 1 ? <WalletDepositTabContent /> : false}</TabPanel>

            {/* Withdrawal */}
            <TabPanel>{tabIndex === 2 ? <WalletWithdrawalTabContent /> : false}</TabPanel>
          </Tabs>
        </div>
      </div>
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('WalletContext must be used within a WalletProvider');
  }
  return context;
};
