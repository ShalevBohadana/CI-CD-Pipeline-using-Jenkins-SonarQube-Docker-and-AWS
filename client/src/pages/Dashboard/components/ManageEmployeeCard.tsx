/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import moment from 'moment';
import { TbMail, TbPhone } from 'react-icons/tb';

import { GradientBordered } from '../../../components/ui/GradientBordered';
import { IEmployeeData } from '../../../redux/features/employee/employeApi';
import { twMergeClsx } from '../../../utils/twMergeClsx';

import { ManageUserMenu } from './ManageUserMenu';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  status: 'active' | 'inactive';
  avatar: string;
};
export type Employee = User & {
  dateHired: string;
  department: string;
  designation: string;
};

export const PartnerCategory = {
  CURRENCY_PROVIDER: 'Currency Provider',
  CURRENCY_SELLER: 'Currency Seller',
  BOOSTER: 'Booster',
} as const;

export type TPartnerCategory = (typeof PartnerCategory)[keyof typeof PartnerCategory];

export type Partner = User & {
  dateJoined: string;
  category: TPartnerCategory;
  games: string[];
};

type Props = {
  payload: IEmployeeData;
};

export const ManageEmployeeCard = ({ payload }: Props) => {
  const { name, email } = payload?.userId;

  const status = payload?.userId?.online;

  const avatar = payload?.userId?.avatar;

  // console.log(avatar, 'imageUrl');
  return (
    <div className='rounded-[.625rem] border border-white/10 bg-white/[.02] px-4 py-5 relative isolate z-0'>
      <div className='flex flex-wrap gap-2 items-center justify-end'>
        <ManageUserMenu payload={payload?.userId as any} />
      </div>
      <div className='grid gap-3'>
        <div className='flex flex-wrap gap-2 xl:gap-4 items-center justify-center'>
          <GradientBordered className='inline-flex w-16 h-16 xl:w-20 xl:h-20 aspect-square rounded-circle before:rounded-circle before:bg-gradient-bordered-deep p-0.5 before:p-0.5 overflow-visible'>
            <picture className='flex justify-center items-center overflow-clip w-full h-full'>
              <source media='(min-width: 150px)' srcSet={avatar} />
              <img
                src={avatar}
                alt={name?.firstName}
                className='inline-flex object-cover w-full h-full rounded-circle'
                loading='lazy'
                width='80'
                height='80'
                decoding='async'
                // fetchPriority="low"
              />
            </picture>
            <span
              className={twMergeClsx(
                `absolute inline-flex items-center justify-center aspect-square w-2.5 h-2.5 bottom-2 right-1.5 ${
                  status ? 'bg-green-600' : 'bg-red-600'
                } rounded-circle`
              )}
            />
          </GradientBordered>

          <div className=''>
            <h2 className='font-tti-demi-bold font-semibold text-lg xl:text-xl leading-none text-white'>
              {name?.firstName}
            </h2>
            <p className='font-oxanium font-normal text-base leading-none text-brand-black-10 uppercase'>
              {/* {'designation' in payload
                ? payload.designation
                : payload.games.toString()} */}
              {payload?.roles}
            </p>
          </div>
        </div>

        <div className='flex flex-wrap gap-2 items-center justify-around text-center'>
          <div className='xl:max-w-[11rem] xl:w-full flex flex-col gap-2'>
            <h3 className='capitalize font-tti-regular font-regular text-[.75rem] leading-none text-white'>
              {'department' in payload ? 'department' : 'category'}
            </h3>
            <p className='font-oxanium font-medium text-base leading-none text-brand-black-10'>
              {'department' in payload ? payload.department : ''}
            </p>
          </div>
          <div className='xl:max-w-[11rem] xl:w-full flex flex-col gap-2'>
            <h3 className='capitalize font-tti-regular font-regular text-[.75rem] leading-none text-white'>
              date {'dateHired' in payload ? 'hired' : 'joined'}
            </h3>
            <p className='font-oxanium font-medium text-base leading-none text-brand-black-10'>
              {/* {payload.dateHired} */}
              {moment(payload.dateHired).format('MMMM Do YYYY')}
            </p>
          </div>
        </div>

        <div className='flex flex-wrap gap-2 items-center justify-center xl:justify-between font-tti-regular font-regular text-sm leading-none'>
          <p className='flex gap-2 items-center flex-wrap border border-white/40 rounded-[.25rem] px-4 py-1.5'>
            <TbMail className='w-5 h-5 shrink-0' />
            <span className=''>{email}</span>
          </p>
          <p className='flex gap-2 items-center flex-wrap border border-white/40 rounded-[.25rem] px-4 py-1'>
            <TbPhone className='w-5 h-5 shrink-0' />
            <span className=''>{payload?.contactNumber}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
