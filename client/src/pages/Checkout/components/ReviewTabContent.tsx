import { v4 } from 'uuid';
import { useGetCartQuery } from '../../../redux/features/cart/cartApi';
import { CartSingleItemDataType } from '../../../types/cart/cartDataType';
import { LoadingCircle } from '../../../components/LoadingCircle';
import { PaymentGatewayItem } from '../../Profile/components/PaymentGatewayItem';
import { PAYMENT_METHODS, PaymentMethod } from '../../Profile/components/WalletDepositTabContent';
import { ShoppingCartItem } from '../../../components/ui/ShoppingCartItem';
import { CURRENCY_DATA, CURRENCY_VALUE } from '../../../components/ui/SelectCurrencyDropdown';
import { GradientBordered } from '../../../components/ui/GradientBordered';

// קודם כל נגדיר את הטיפוסים הנכונים
type CartDataResponse = {
  data: {
    items: CartSingleItemDataType[];
  };
};

export const ReviewTabContent = () => {
  const { data: cartData, isLoading } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  }) as { data: CartDataResponse; isLoading: boolean };
  const ShoppingCartItemWrapper = ({ payload }: { payload: any }): JSX.Element => {
    // Get the content from the original component
    const content = ShoppingCartItem({ payload });
    // Always return a React element by wrapping with a fragment
    return <>{content}</>;
  };

  // וודא שהמערך לא null
  const cartItems = cartData?.data?.items ?? [];

  // הגדר טיפוס לשיטת התשלום הנבחרת
  const selectedMethod: PaymentMethod | undefined = PAYMENT_METHODS.find(
    (method) => method.name === PAYMENT_METHODS[0].name
  );

  const symbol = CURRENCY_DATA?.find((c) => c?.value === CURRENCY_VALUE?.USD)?.symbol;

  // חישוב סכומים עם בדיקות null
  const subtotal = cartItems.reduce((sum, item) => sum + (item.selected?.price || 0), 0);
  const serviceFee = selectedMethod ? (selectedMethod.serviceFee / 100) * subtotal : 0;
  const total = subtotal + serviceFee;

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className='grid gap-6 xl:gap-8'>
      {/* שיטת תשלום */}
      <GradientBordered className='p-4 xl:p-6 rounded-xl'>
        <h2 className='first-letter:capitalize text-white text-[clamp(1rem,3vw,1.75rem)] leading-none font-semibold font-tti-demi-bold mb-4'>
          Payment Method
        </h2>

        {selectedMethod && (
          <div className='relative isolate z-0'>
            <PaymentGatewayItem gateway={selectedMethod} showFee={true} disabled={true} />
          </div>
        )}
      </GradientBordered>

      {/* רשימת פריטים */}
      <GradientBordered className='p-4 xl:p-6 rounded-xl'>
        <h2 className='first-letter:capitalize text-white text-[clamp(1rem,3vw,1.75rem)] leading-none font-semibold font-tti-demi-bold mb-4'>
          Order Review
        </h2>

        {cartItems.length === 0 ? (
          <p className='text-center text-brand-black-20 py-8'>Your cart is empty</p>
        ) : (
          <>
            <div className='flex flex-col gap-3 xl:gap-4 overflow-auto max-h-[400px] minimal-scrollbar'>
              {cartItems.map((item) => (
                <ShoppingCartItemWrapper key={v4()} payload={item as any} />
              ))}
            </div>

            {/* סיכום הזמנה */}
            <div className='mt-6 pt-4 border-t border-brand-black-20/10'>
              <div className='space-y-2 font-oxanium'>
                <div className='flex justify-between items-center'>
                  <span className='text-brand-black-20'>Subtotal</span>
                  <span className='text-white'>
                    {symbol}
                    {subtotal.toFixed(2)}
                  </span>
                </div>

                {selectedMethod && (
                  <div className='flex justify-between items-center'>
                    <span className='text-brand-black-20'>
                      Service Fee ({selectedMethod.serviceFee}%)
                    </span>
                    <span className='text-white'>
                      {symbol}
                      {serviceFee.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className='flex justify-between items-center pt-2 border-t border-brand-black-20/10 font-semibold'>
                  <span className='text-white'>Total</span>
                  <span className='text-brand-primary-color-1'>
                    {symbol}
                    {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </GradientBordered>

      {cartItems.length > 0 && (
        <div className='text-sm text-brand-black-20 px-2'>
          <p>
            By proceeding with the payment, you agree to our{' '}
            <a href='/terms' className='text-brand-primary-color-1 hover:underline'>
              Terms of Service
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
