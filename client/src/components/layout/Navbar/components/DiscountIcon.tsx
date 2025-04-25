import { DollarSign, Percent } from 'lucide-react';

interface DiscountIconProps {
  type: 'fixed' | 'percentage';
  className?: string;
}

const DiscountIcon = ({ type, className = 'w-5 h-5' }: DiscountIconProps) => {
  return (
    <div className='inline-flex pl-4'>
      {type === 'fixed' ? <DollarSign className={className} /> : <Percent className={className} />}
    </div>
  );
};

export default DiscountIcon;
