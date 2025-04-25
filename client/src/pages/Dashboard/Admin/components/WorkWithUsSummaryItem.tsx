import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';

import { GradientBordered } from '../../../../components/ui/GradientBordered';
import { NormalizedDbData, Pretty } from '../../../../types/globalTypes';
import { BecomeBoosterFormInputs } from '../../../BecomeBooster/BecomeBoosterForm';
import { BecomeCurrencySellerFormInputs } from '../../../BecomeCurrencySeller/BecomeCurrencySellerForm';
import { BecomeCurrencySupplierFormInputs } from '../../../BecomeCurrencySupplier/BecomeCurrencySupplierForm';
import { UserDataDb } from '../../../Profile/components/AccountInfo';
import { useWorkWithUsApprovalContext } from '../WorkWithUsApproval';
import { GameDataDb } from '@/pages/CreateGame/context/CreateGameContext';

export type BecomeBoosterDataDb = Pretty<
  NormalizedDbData &
    BecomeBoosterFormInputs & {
      status: 'accepted' | 'rejected' | 'pending';
      selectedGames: GameDataDb[];
      user: UserDataDb;
      phone?: string;
    }
>;
export type BecomeCurrencySellerDataDb = Pretty<
  NormalizedDbData & {
    status: 'accepted' | 'rejected' | 'pending';
  } & BecomeCurrencySellerFormInputs
>;

export type BecomeCurrencySupplierDataDb = Pretty<
  NormalizedDbData & {
    status: 'accepted' | 'rejected' | 'pending';
  } & BecomeCurrencySupplierFormInputs
>;

export type WorkWithUsSummaryProps =
  | BecomeBoosterDataDb
  | BecomeCurrencySellerDataDb
  | BecomeCurrencySupplierDataDb;

type Props = {
  payload: WorkWithUsSummaryProps;
};

export const WorkWithUsSummaryItem = ({ payload }: Props) => {
  const { setIsOpen, setWorkWithUsSummary } = useWorkWithUsApprovalContext();
  const { appliedFor, email, discordTag, status, _id: _ } = payload;
  const normalizedRole = startCase(camelCase(appliedFor));

  const handleModal = async () => {
    setIsOpen(true);
    setWorkWithUsSummary(payload);
    console.log(payload);
  };

  return (
    <GradientBordered className='rounded-[1.25rem] before:rounded-[1.25rem] before:transition-all before:bg-gradient-bordered-light p-4 xl:p-8 bg-multi-gradient-1 overflow-visible grid grid-cols-1 gap-8'>
      {/* details  */}
      <div className='grid md:grid-cols-[1fr_auto] justify-between gap-4'>
        <div className='flex flex-col gap-3'>
          <h2 className='first-letter:uppercase font-bold font-tti-bold text-[clamp(1.35rem,4vw,2rem)] leading-none line-clamp-1'>
            Application for{' '}
            <span className='capitalize text-brand-primary-color-1'>{normalizedRole}</span>
          </h2>

          <p className='font-oxanium text-lg leading-none font-normal'>
            <span className='capitalize text-brand-primary-color-1'>email:</span>{' '}
            <span className='first-letter:uppercase inline-block'>{email}</span>
          </p>
          <p className='font-oxanium text-lg leading-none font-normal'>
            <span className='capitalize text-brand-primary-color-1'>Discord Tag:</span>{' '}
            <span className='first-letter:uppercase inline-block'>{discordTag}</span>
          </p>
          <p className='font-oxanium text-lg leading-none font-normal'>
            <span className='capitalize text-brand-primary-color-1'>status:</span>{' '}
            <span className='first-letter:uppercase inline-block'>{status}</span>
          </p>
        </div>
        <GradientBordered className='rounded-[.25rem] before:rounded-[.25rem] before:transition-all before:bg-gradient-bordered-light overflow-clip inline-flex w-auto h-auto self-start justify-self-start'>
          <button
            type='button'
            onClick={handleModal}
            className='flex items-center justify-center text-center text-sm xl:text-base leading-none xl:leading-none font-normal font-tti-regular bg-brand-primary-color-1/[.03] text-brand-black-10 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 py-2.5 xl:px-5 xl:py-4 rounded-[.25rem] capitalize'
          >
            application summary
          </button>
          {/* <Link
            to={ROUTER_PATH.SUPPORT_TICKET_SUMMARY.replace(
              ROUTE_PARAM.UID,
              uid
            )}
            className="flex items-center justify-center text-center text-sm xl:text-base leading-none xl:leading-none font-normal font-tti-regular bg-brand-primary-color-1/[.03] text-brand-black-10 hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors px-4 py-2.5 xl:px-5 xl:py-4 rounded-[.25rem] capitalize"
          >
            application summary
          </Link> */}
        </GradientBordered>
      </div>
    </GradientBordered>
  );
};
