import { PaymentGatewayItem } from '../../Profile/components/PaymentGatewayItem';
import { PAYMENT_METHODS } from '../../Profile/components/WalletDepositTabContent';

export const PaymentMethodTabContent = () => {
  return (
    <div className='grid gap-4 xl:gap-8'>
      <h2 className='first-letter:capitalize text-white text-[clamp(1rem,3vw,1.75rem)] leading-none font-semibold font-tti-demi-bold pl-1'>
        Available payment methods
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 xl:gap-8'>
        {PAYMENT_METHODS?.map((gateway) => (
          <PaymentGatewayItem
            key={gateway?.id}
            gateway={gateway}
            name='method'
            // showFee
            // register={register('method', {
            //   required: 'Please select a method',
            // })}
          />
        ))}
      </div>

      {/* <ShowInputError errors={errors} name="method" /> */}
    </div>
  );
};
