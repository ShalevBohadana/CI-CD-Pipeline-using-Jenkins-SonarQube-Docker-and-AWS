import { ExtendHead } from '../../../../components/ExtendHead';
import { GradientBordered } from '../../../../components/ui/GradientBordered';
// import { ALERT_ROWS } from '../../Partner/Order';

export const SupportOrder = () => {
  return (
    <main className='flex flex-col gap-8 overflow-auto minimal-scrollbar min-h-[theme(height.40)]'>
      <ExtendHead title='Order - Support Dashboard' description='Order Support dashboard' />
      <h2 className='capitalize font-semibold font-tti-demi-bold text-[clamp(1.35rem,4vw,2rem)] leading-tight'>
        <span className='text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
          alerts
        </span>
      </h2>
      <GradientBordered className='rounded-lg before:rounded-lg before:transition-all before:bg-gradient-bordered-light py-5 bg-brand-primary-color-1/[.04]'>
        <table className='h-[inherit] grid gap-y-4 overflow-auto minimal-scrollbar font-oxanium text-sm xl:text-base leading-none font-medium text-white'>
          <thead
            className='px-5 xl:px-10 sticky top-0 isolate z-10 after:absolute after:z-10 after:right-0 after:w-full after:h-px after:bg-[linear-gradient(293deg,var(--tw-gradient-stops))] 
        after:from-brand-primary-color-1/40 after:to-brand-primary-color-1/30'
          >
            <tr className='grid grid-cols-4 gap-x-1 items-center xl:items-stretch font-semibold px-3 xl:px-0 pb-5'>
              <th className='first-letter:capitalize backdrop-blur-sm text-start'>game name</th>
              <th className='first-letter:capitalize backdrop-blur-sm text-start'>Order ID</th>
              <th className='first-letter:capitalize backdrop-blur-sm text-start'>Status</th>
              <th className='first-letter:capitalize backdrop-blur-sm text-start'>Edit</th>
            </tr>
          </thead>
          <tbody className='overflow-auto minimal-scrollbar grid gap-y-4 px-5'>
            {/* {ALERT_ROWS?.map((row) => (
              <AlertRowItem key={row.orderId} payload={row} />
            ))} */}
          </tbody>
        </table>
      </GradientBordered>
    </main>
  );
};
