import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';
import toast from 'react-hot-toast';

import { ROLE } from '../../../../../enums/role';
import { ResError } from '../../../../../redux/api/apiSlice';
import {
  useApproveBoosterMutation,
  useRejectBoosterMutation,
} from '../../../../../redux/features/becomeBooster/becomeBoosterApi';
import {
  useApproveCurrencySellerMutation,
  useRejectCurrencySellerMutation,
} from '../../../../../redux/features/becomeCurrencySeller/becomeCurrencySellerApi';
import {
  useApproveCurrencySupplierMutation,
  useRejectCurrencySupplierMutation,
} from '../../../../../redux/features/becomeCurrencySupplier/becomeCurrencySupplierApi';
import { useWorkWithUsApprovalContext } from '..';

export const WorkWithUsSummaryModalContent = () => {
  const { setIsOpen, workWithUsSummary } = useWorkWithUsApprovalContext();
  const [approveBooster] = useApproveBoosterMutation();
  const [approveCurrencySeller] = useApproveCurrencySellerMutation();
  const [approveCurrencySupplier] = useApproveCurrencySupplierMutation();
  const [rejectBooster] = useRejectBoosterMutation();
  const [rejectCurrencySeller] = useRejectCurrencySellerMutation();
  const [rejectCurrencySupplier] = useRejectCurrencySupplierMutation();

  if (!workWithUsSummary) {
    return <p className=''>No summary data found</p>;
  }
  const { _id, status, appliedFor, email, discordTag, selectedGames, about } = workWithUsSummary;
  const normalizedRole = startCase(camelCase(appliedFor));
  const selectedGameNames = selectedGames.map(
    (game) => (game as unknown as Record<string, string>).name
  );
  const handleApplicationAccept = async () => {
    try {
      let message: string = '';
      switch (appliedFor) {
        case ROLE.BOOSTER: {
          const result = await approveBooster({ _id }).unwrap();
          message = result.message;
          return;
        }

        case ROLE.CURRENCY_SELLER: {
          const result = await approveCurrencySeller({ _id }).unwrap();
          message = result.message;
          return;
        }
        case ROLE.CURRENCY_SUPPLIER: {
          const result = await approveCurrencySupplier({ _id }).unwrap();
          message = result.message;
          break;
        }

        default:
          break;
      }
      toast.success(message || 'Application accepted successfully');
    } catch (error) {
      toast.error((error as unknown as ResError)?.data.message || 'Something went wrong');
    } finally {
      setIsOpen(false);
    }
  };
  const handleApplicationReject = async () => {
    try {
      let message: string = '';
      switch (appliedFor) {
        case ROLE.BOOSTER: {
          const result = await rejectBooster(_id).unwrap();
          message = result.message;
          return;
        }

        case ROLE.CURRENCY_SELLER: {
          const result = await rejectCurrencySeller(_id).unwrap();
          message = result.message;
          return;
        }
        case ROLE.CURRENCY_SUPPLIER: {
          const result = await rejectCurrencySupplier(_id).unwrap();
          message = result.message;
          break;
        }

        default:
          break;
      }
      toast.success(message || 'Application rejected');
    } catch (error) {
      toast.error((error as unknown as ResError)?.data.message || 'Something went wrong');
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className='grid gap-4 items-start text-left'>
      <h2 className='first-letter:uppercase font-bold font-tti-bold text-[clamp(1.35rem,4vw,2rem)] leading-none line-clamp-2 text-center'>
        <span className=''>Application for</span> <br />
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
      <p className='font-oxanium text-lg leading-none font-normal'>
        <span className='capitalize text-brand-primary-color-1'>about:</span>{' '}
        <span className='first-letter:uppercase inline-block'>{about}</span>
      </p>
      <p className='font-oxanium text-lg leading-none font-normal'>
        <span className='capitalize text-brand-primary-color-1'>selected games:</span>{' '}
        <span className='first-letter:uppercase inline-block'>{selectedGameNames?.toString()}</span>
      </p>
      <div className='flex flex-wrap gap-4 justify-center'>
        <button
          type='button'
          className='self-center inline-flex justify-center rounded-md border border-transparent hover:bg-brand-primary-color-1 px-4 py-2 text-sm font-medium hover:text-brand-primary-color-light bg-brand-primary-color-light text-brand-primary-color-1 transition-colors capitalize'
          onClick={handleApplicationReject}
        >
          reject
        </button>
        <button
          type='button'
          className='self-center inline-flex justify-center rounded-md border border-transparent bg-brand-primary-color-1 px-4 py-2 text-sm font-medium text-brand-primary-color-light hover:bg-brand-primary-color-light hover:text-brand-primary-color-1 transition-colors capitalize'
          onClick={handleApplicationAccept}
        >
          accept
        </button>
      </div>
    </div>
  );
};
