import { TbFileDownload } from 'react-icons/tb';

import { UserSearchBox } from './components/UserSearchBox';

export const Header = () => {
  return (
    <header className='grid gap-6'>
      <div className='flex flex-wrap gap-5 items-center justify-center xl:justify-between'>
        <h2 className='font-tti-demi-bold font-semibold text-[clamp(1.35rem,4vw,2rem)] leading-none text-white capitalize'>
          User Manager
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
        </div>
      </div>
      {/* filter buttons */}
      <div className='grid gap-4 xl:gap-5'>
        <UserSearchBox />
      </div>
    </header>
  );
};
