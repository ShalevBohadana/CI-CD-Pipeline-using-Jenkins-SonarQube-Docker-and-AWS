import { CurrencySymbol } from '../../../components/ui/CurrencySymbol';
import { Money } from '../../../components/ui/Money';

type Props = {
  money: number;
};

export const ShowFilterFee = ({ money }: Props) => {
  return (
    <span className='text-sm leading-none font-normal text-brand-black-20 font-oxanium order-last ml-auto shrink-0'>
      +<CurrencySymbol />
      <Money value={money} />
    </span>
  );
};
