import { useAdminFinancesContext } from '..';

export const AdminFinancesSummaryModalContent = () => {
  const { setIsOpen, adminFinancesSummary } = useAdminFinancesContext();
  if (!adminFinancesSummary) {
    return <p className=''>No summary data found</p>;
  }
  const { status, email } = adminFinancesSummary;

  const handleApplicationAccept = async () => {
    setIsOpen(false);
  };
  const handleApplicationReject = async () => {
    setIsOpen(false);
  };

  return (
    <div className='grid gap-4 items-start'>
      {/* <h2 className="first-letter:uppercase font-bold font-tti-bold text-[clamp(1.35rem,4vw,2rem)] leading-none line-clamp-2">
        <span className="">Application for</span> <br />
        <span className="capitalize text-brand-primary-color-1">
          {normalizedRole}
        </span>
      </h2> */}
      <p className='font-oxanium text-lg leading-none font-normal'>
        <span className='capitalize text-brand-primary-color-1'>email:</span>{' '}
        <span className='first-letter:uppercase inline-block'>{email}</span>
      </p>
      {/* <p className="font-oxanium text-lg leading-none font-normal">
        <span className="capitalize text-brand-primary-color-1">
          Discord Tag:
        </span>{' '}
        <span className="first-letter:uppercase inline-block">
          {discordTag}
        </span>
      </p> */}
      <p className='font-oxanium text-lg leading-none font-normal'>
        <span className='capitalize text-brand-primary-color-1'>status:</span>{' '}
        <span className='first-letter:uppercase inline-block'>{status}</span>
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
