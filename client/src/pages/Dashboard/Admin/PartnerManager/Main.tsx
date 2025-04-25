import { PartnerManagement } from './components/PartnerManagement';

export const Main = () => {
  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <div className='h-[inherit] grid gap-y-5 gap-x-5 '>
        <PartnerManagement />
      </div>

      {/* <OrderSummaryModal /> */}
    </main>
  );
};
