import { useEffect, useState } from 'react';

import { LoadingCircle } from '../../../../components/LoadingCircle';
import {
  IEmployeeData,
  useGetAllEmployeesQuery,
} from '../../../../redux/features/employee/employeApi';
import { ManageEmployeeCard } from '../../components/ManageEmployeeCard';

export const Main = ({ online }: { online: string }) => {
  const { data, isLoading } = useGetAllEmployeesQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [employeeData, setEmployeeData] = useState<IEmployeeData[]>([]);
  // const employeeData = data?.data;
  // console.log(employeeData, 'employees');
  useEffect(() => {
    if (online === 'active') {
      setEmployeeData(data?.data?.filter((employee) => employee?.userId?.online) || []);
    } else if (online === 'inactive') {
      setEmployeeData(data?.data?.filter((employee) => employee?.userId?.online === false) || []);
    } else {
      setEmployeeData(data?.data || []);
    }
    return () => {
      setEmployeeData([]);
    };
  }, [online, data]);
  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-5 gap-x-5 grid-cols-[repeat(1,min(100%,22.5rem))] justify-center md:grid-cols-2 lg:grid-cols-3 overflow-auto minimal-scrollbar'>
        {employeeData?.map((employee) => (
          <ManageEmployeeCard key={employee?._id} payload={employee} />
        ))}
      </div>

      {/* <OrderSummaryModal /> */}
    </main>
  );
};
