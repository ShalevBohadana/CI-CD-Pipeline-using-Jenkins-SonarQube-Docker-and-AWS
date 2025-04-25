import { createContext, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

import { ExtendHead } from '../../../../components/ExtendHead';
import { useGetAllBoostersQuery } from '../../../../redux/features/becomeBooster/becomeBoosterApi';
import { useGetAllCurrencySellersQuery } from '../../../../redux/features/becomeCurrencySeller/becomeCurrencySellerApi';
import { useGetAllCurrencySuppliersQuery } from '../../../../redux/features/becomeCurrencySupplier/becomeCurrencySupplierApi';
import {
  BecomeBoosterDataDb,
  BecomeCurrencySellerDataDb,
  BecomeCurrencySupplierDataDb,
  WorkWithUsSummaryProps,
} from '../components/WorkWithUsSummaryItem';

import { Header } from './Header';
import { Main } from './Main';

type WorkWithUsApprovalContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  workWithUsSummary?:
    | BecomeBoosterDataDb
    | BecomeCurrencySellerDataDb
    | BecomeCurrencySupplierDataDb;
  setWorkWithUsSummary: React.Dispatch<
    SetStateAction<
      BecomeBoosterDataDb | BecomeCurrencySellerDataDb | BecomeCurrencySupplierDataDb | undefined
    >
  >;
  applications?: Array<
    BecomeBoosterDataDb | BecomeCurrencySellerDataDb | BecomeCurrencySupplierDataDb
  >;
  setApplications: React.Dispatch<
    SetStateAction<
      Array<BecomeBoosterDataDb | BecomeCurrencySellerDataDb | BecomeCurrencySupplierDataDb>
    >
  >;
};

const WorkWithUsApprovalContext = createContext<WorkWithUsApprovalContextType | undefined>(
  undefined
);

export const WorkWithUsApproval = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [workWithUsSummary, setWorkWithUsSummary] = useState<WorkWithUsSummaryProps>();
  const [applications, setApplications] = useState<
    Array<BecomeBoosterDataDb | BecomeCurrencySellerDataDb | BecomeCurrencySupplierDataDb>
  >([]);

  const workWithUsApprovalContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      workWithUsSummary,
      setWorkWithUsSummary,
      applications,
      setApplications,
    }),
    [isOpen, setIsOpen, workWithUsSummary, setWorkWithUsSummary, applications, setApplications]
  );
  const params = new URLSearchParams({
    limit: '100',
    status: 'pending',
  });
  // const [getAllBoosters] = useLazyGetAllBoostersQuery();
  // const [getAllCurrencySellers] = useLazyGetAllCurrencySellersQuery();
  // const [getAllCurrencySuppliers] = useLazyGetAllCurrencySuppliersQuery();
  const { data: allBoostersRes } = useGetAllBoostersQuery(params.toString(), {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data: allSellersRes } = useGetAllCurrencySellersQuery(params.toString(), {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data: allSuppliersRes } = useGetAllCurrencySuppliersQuery(params.toString(), {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const allBoosters = useMemo(() => allBoostersRes?.data, [allBoostersRes?.data]);
  const allSellers = useMemo(() => allSellersRes?.data, [allSellersRes?.data]);
  const allSuppliers = useMemo(() => allSuppliersRes?.data, [allSuppliersRes?.data]);
  useEffect(() => {
    const result = [];
    if (allBoosters) {
      result.push(...allBoosters);
    }
    if (allSellers) {
      result.push(...allSellers);
    }
    if (allSuppliers) {
      result.push(...allSuppliers);
    }
    setApplications(result);
  }, [allBoosters, allSellers, allSuppliers]);

  // useEffect(() => {
  //   const getAllApplications = async () => {
  //     const result = [];
  //     const [allBoosters, allCurrencySellers, allCurrencySuppliers] =
  //       await Promise.allSettled([
  //         getAllBoosters(params.toString()),
  //         getAllCurrencySellers(params.toString()),
  //         getAllCurrencySuppliers(params.toString()),
  //       ]);
  //     if (allBoosters.status === 'fulfilled') {
  //       const allBoostersData = allBoosters.value.data?.data;
  //       if (allBoostersData) {
  //         result.push(...allBoostersData);
  //       }
  //     }
  //     if (allCurrencySellers.status === 'fulfilled') {
  //       const allCurrencySellersData = allCurrencySellers.value.data?.data;
  //       if (allCurrencySellersData) {
  //         result.push(...allCurrencySellersData);
  //       }
  //     }
  //     if (allCurrencySuppliers.status === 'fulfilled') {
  //       const allCurrencySuppliersData = allCurrencySuppliers.value.data?.data;
  //       if (allCurrencySuppliersData) {
  //         result.push(...allCurrencySuppliersData);
  //       }
  //     }
  //     setApplications(result);
  //   };
  //   getAllApplications().catch((err) => console.log(err));
  // }, [getAllBoosters, getAllCurrencySellers, getAllCurrencySuppliers, params]);

  return (
    <WorkWithUsApprovalContext.Provider value={workWithUsApprovalContextValue}>
      <ExtendHead
        title='Work With Us Approval - Admin Dashboard'
        description='Work With Us Approval Admin dashboard'
      />
      <Header />
      <Main />
    </WorkWithUsApprovalContext.Provider>
  );
};

export const useWorkWithUsApprovalContext = () => {
  const context = useContext(WorkWithUsApprovalContext);
  if (!context) {
    throw new Error('useWorkWithUsApprovalContext must be used within WorkWithUsApproval');
  }
  return context;
};
