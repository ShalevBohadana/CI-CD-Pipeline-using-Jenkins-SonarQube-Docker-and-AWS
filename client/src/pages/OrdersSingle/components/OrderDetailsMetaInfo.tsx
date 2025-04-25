import React from 'react';
import { ReactNode } from 'react';
import { GradientBordered } from '../../../components/ui/GradientBordered';
import { JoinServerCard } from '../../../components/JoinServerCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type OrderDetailsMetaInfoProps = {
  label: string;
  value: string | ReactNode;
  orderId?: string;
  channelInviteUrl?: string;
  isChannelCreated?: boolean;
};

export const OrderDetailsMetaInfo: React.FC<OrderDetailsMetaInfoProps> = ({
  label,
  value,
  orderId,
  channelInviteUrl,
  isChannelCreated,
}) => {
  const userData = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-4">
      {orderId && (
        <JoinServerCard
          orderId={orderId}
          userId={userData?.user?._id} // Changed from 'id' to '_id' to match User interface
          channelInviteUrl={channelInviteUrl}
          isChannelCreated={isChannelCreated}
        />
      )}
      <div className='grow flex flex-col gap-4 font-oxanium text-sm xl:text-base leading-none font-normal'>
        <p className='capitalize text-brand-black-10'>{label}</p>
        <GradientBordered className='p-4 rounded-[.625rem] before:rounded-[.625rem] before:bg-gradient-bordered-deep bg-brand-primary-color-1/[.03]'>
          <span className='text-brand-black-5 inline-block first-letter:capitalize'>{value}</span>
        </GradientBordered>
      </div>
    </div>
  );
};