export const Header = () => {
  return (
    <header className='relative isolate z-50 overflow-clip py-10 xl:py-20'>
      <div className='fb-container grid gap-4'>
        <h2 className='capitalize font-bold font-tti-bold text-center text-[clamp(1.85rem,5vw,3rem)] leading-tight'>
          How Can we{' '}
          <span className='inline-flex justify-center text-center text-brand-primary-color-1/30 bg-clip-text bg-[linear-gradient(293deg,var(--tw-gradient-stops))] from-brand-primary-color-1 to-brand-primary-color-light animate-text-gradient'>
            Help
          </span>{' '}
          you?
        </h2>
      </div>
    </header>
  );
};
