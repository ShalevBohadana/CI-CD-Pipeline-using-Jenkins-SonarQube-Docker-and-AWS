import { Dispatch, SetStateAction, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { TbFileDownload } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';

import { lazilyLoadable } from '../../../../utils/lazilyLoadable';
import { DashboardModal } from '../../components/DashboardModal';
import { useDashboardPageStatus } from '../../components/DashboardProvider';

export const STATUS_BUTTON_TEXTS = ['all', 'active', 'inactive'] as const;
const { AddNewEmployeeForm } = lazilyLoadable(() => import('../components/AddNewEmployeeForm'));
export const Header = ({ setStatus }: { setStatus: Dispatch<SetStateAction<string>> }) => {
  const [activeBtn, setActiveBtn] = useState<string>(STATUS_BUTTON_TEXTS[0]);
  const handleStatusFilter = (status: string) => {
    return () => {
      setActiveBtn(status);
      setStatus(status);
    };
  };
  const { setIsModalOpen } = useDashboardPageStatus();
  const handleAddNewEmployeeModal = () => {
    setIsModalOpen(true);
  };

  return (
    <header className='grid gap-6'>
      <div className='flex flex-wrap gap-5 items-center justify-center xl:justify-between'>
        <h2 className='font-tti-demi-bold font-semibold text-[clamp(1.35rem,4vw,2rem)] leading-none text-white capitalize'>
          employees
        </h2>
        {/* action buttons */}
        <div className='inline-flex items-center gap-5 xl:justify-self-end'>
          <button
            type='button'
            className='relative isolate overflow-clip gradient-bordered before:pointer-events-none before:p-px rounded-[.25rem] before:rounded-[.25rem] before:bg-gradient-bordered-light px-3 xl:px-6 py-2.5 inline-flex justify-center items-end gap-1 xl:gap-2.5 text-brand-black-40 hover:text-white transition-all hover:before:bg-gradient-bordered-deep'
          >
            <TbFileDownload className='w-5 h-5 shrink-0' />
            <span className='capitalize font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
              download
            </span>
          </button>
          <button
            onClick={handleAddNewEmployeeModal}
            type='button'
            className='
            inline-flex items-center gap-2
            px-4 py-2.5 
            rounded
            bg-brand-primary-color-1 
            text-white
            hover:bg-brand-primary-color-light 
            hover:text-brand-primary-color-1
            transition-colors
            duration-200
          '
          >
            <BiPlus className='w-5 h-5 shrink-0' />
            <span className='capitalize font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
              Add New
            </span>
          </button>
        </div>
      </div>
      {/* filter buttons */}
      <div className='grid sm:grid-cols-3 gap-4 xl:gap-5'>
        {STATUS_BUTTON_TEXTS?.map((status) => (
          <button
            key={uuidv4()}
            onClick={handleStatusFilter(status)}
            type='button'
            className={`relative isolate overflow-clip gradient-bordered before:pointer-events-none before:p-px rounded-md before:rounded-md px-6 py-2.5 flex justify-center items-center gap-1 xl:gap-2.5 font-oxanium font-medium text-lg xl:text-xl leading-none transition-all hover:before:bg-gradient-bordered-deep ${
              status === activeBtn
                ? 'before:bg-gradient-bordered-deep text-brand-primary-color-1'
                : 'before:bg-gradient-bordered-light text-brand-black-10'
            } bg-brand-primary-color-1/[.03]`}
          >
            {status !== 'all' ? (
              <span
                className={`inline-flex items-center justify-center aspect-square w-2.5 ${
                  status === 'active' ? 'bg-green-600' : ''
                }
            ${status === 'inactive' ? 'bg-red-600' : ''}
            rounded-circle`}
              />
            ) : null}
            <span className='capitalize'>{status}</span>
          </button>
        ))}
      </div>
      <DashboardModal>
        <AddNewEmployeeForm onSuccess={() => setIsModalOpen(false)} />
      </DashboardModal>
    </header>
  );
};
