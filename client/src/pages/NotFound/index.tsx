import { useRouteError } from 'react-router-dom';

export const NotFound = () => {
  const error: {
    message?: string;
    statusText?: string;
  } = useRouteError() as object;

  // console.log(error);

  return (
    <div className='text-center pt-16 text-red-600'>
      {error && (error?.message || error?.statusText) ? (
        <p className=''>{error?.statusText}</p>
      ) : (
        <p className=''>Ops... Not Found!</p>
      )}
    </div>
  );
};
