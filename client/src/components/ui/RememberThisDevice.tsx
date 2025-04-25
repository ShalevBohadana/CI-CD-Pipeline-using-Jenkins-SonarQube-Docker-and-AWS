import { useRememberThisDevice } from '../../hooks/useRememberThisDevice';

export const RememberThisDevice = () => {
  const { shouldRememberDevice, setShouldRememberDevice } = useRememberThisDevice();
  const handleToggle = async () => setShouldRememberDevice((prev) => !prev);

  return (
    <label className='flex grow w-full justify-center gap-3 items-end relative isolate z-0 cursor-pointer text-sm leading-none font-normal text-brand-black-20 font-oxanium'>
      <input
        type='checkbox'
        className='appearance-none sr-only peer'
        defaultChecked={shouldRememberDevice}
        onChange={handleToggle}
      />
      <span className='peer-checked:bg-brand-primary-color-1 transition-colors checked-bg-image-check-mark-black bg-center bg-no-repeat inline-flex w-4 aspect-square border-2 border-brand-primary-color-1/50 bg-transparent rounded-sm shrink-0' />
      <span className='inline-block first-letter:uppercase'>remember this device</span>
    </label>
  );
};
