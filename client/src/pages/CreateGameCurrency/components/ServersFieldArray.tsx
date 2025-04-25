import { ErrorBoundary } from 'react-error-boundary';
import {
  Control,
  FieldErrors,
  FieldValues,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { BiPlus } from 'react-icons/bi';

import { ErrorFallback } from '../../../error/ErrorFallback';
import { logError } from '../../../error/logError';
import { ErrorBoundaryResetHandler } from '../../../error/utils';
import { kebabCasedUrl } from '../../../utils';
import { GradientBorderedInput } from '../../Profile/components/GradientBorderedInput';
import { CreateGameCurrencyFormInputs } from '../Main';

type Props<T extends FieldValues> = {
  control: Control<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
};

// let renderCount = 0;
const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  // Reset the state of your app so the error doesn't happen again
  console.log(details);
};
export const ServersFieldArray = ({
  control,
  register,
  setValue,

  watch,
  errors,
}: Props<CreateGameCurrencyFormInputs>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'servers',
  });

  const handleAddNewSlider = async () => {
    append({
      title: '',
      region: '',
      label: '',
      value: '',
    });
    // console.log('Add  New filter');
  };

  const handleRemoveSlider = (index: number) => {
    return async () => {
      remove(index);
      // console.log('remove filter');
    };
  };

  const userGeneratedRegions = watch(`dynamicFilters`)
    ?.find((item) => item?.name?.toLowerCase() === 'region')
    ?.children?.map((child) => child?.name)
    .sort();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      {userGeneratedRegions ? (
        <datalist id='regions'>
          {userGeneratedRegions?.map((regionName) => (
            <option key={regionName} value={regionName}>
              {regionName}
            </option>
          ))}
        </datalist>
      ) : null}
      <section className='flex flex-wrap justify-between xl:justify-center relative isolate z-0 gap-4'>
        <h2 className='xl:absolute capitalize text-center font-semibold font-tti-demi-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'>
          servers
        </h2>
        <button
          type='button'
          onClick={handleAddNewSlider}
          className='xl:ml-auto px-2 xl:px-6 py-1.5 xl:py-2.5 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
        >
          <BiPlus className='w-5 h-5 shrink-0' />
          <span className='inline-block first-letter:capitalize font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
            add new server
          </span>
        </button>
      </section>
      <ul className='grid gap-8 grid-cols-1 items-start minimal-scrollbar overflow-auto min-h-[16rem] max-h-[32rem]'>
        {fields.map((item, index) => {
          const serverTitle = watch(`servers.${index}.title`);
          const serverRegion = watch(`servers.${index}.region`);
          if (serverTitle && serverRegion) {
            setValue(`servers.${index}.label`, `${serverTitle} - ${serverRegion}`);
            setValue(`servers.${index}.value`, kebabCasedUrl(`${serverTitle} ${serverRegion}`));
          }
          return (
            <li key={item.id} className='w-full grid xl:grid-cols-3 items-start gap-5 p-1 xl:p-1'>
              {/* <input
                type="hidden"
                // readOnly
                // defaultValue={kebabCasedUrl(`${serverTitle} ${serverRegion}`)}
                {...register(`servers.${index}.value`, {
                  setValueAs: (value) =>
                    kebabCasedUrl(`${serverTitle} ${serverRegion}`),
                })}
              /> */}
              {/* {!isEditing ? (
                <input
                  type="hidden"
                  readOnly
                  {...register(`servers.${index}.value`)}
                  value={kebabCasedUrl(`${serverTitle} ${serverRegion}`)}
                />
              ) : null} */}

              {/* {serverTitle && serverRegion ? (
                <input
                  type="hidden"
                  readOnly
                  defaultValue={`${serverTitle} - ${serverRegion}`}
                  {...register(`servers.${index}.label`)}
                />
              ) : null} */}
              {/* <div className="grid xl:grid-cols-3 gap-5"> */}
              <div className='grow'>
                <GradientBorderedInput
                  label='Server title'
                  placeholder='Server title'
                  defaultValue={item.title}
                  errors={errors}
                  register={register(`servers.${index}.title`)}
                />
              </div>
              <div className='grow'>
                <GradientBorderedInput
                  label='Region'
                  placeholder={userGeneratedRegions?.[0] || 'eu'}
                  defaultValue={item.region}
                  list='regions'
                  errors={errors}
                  register={register(`servers.${index}.region`)}
                />
              </div>

              <button
                type='button'
                onClick={handleRemoveSlider(index)}
                className='self-center justify-self-start p-.5 pr-1 rounded-[.25rem] inline-flex justify-center items-center gap-.5 bg-brand-black-60 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
              >
                <BiPlus className='w-5 h-5 shrink-0 rotate-45' />
                <span className='font-tti-regular font-normal text-xs leading-none line-clamp-1 text-start'>
                  Remove{' '}
                  {serverTitle && serverRegion ? (
                    <span className=''>
                      {serverTitle} - {serverRegion}
                    </span>
                  ) : null}{' '}
                  Server
                </span>
              </button>
              {/* </div> */}

              {/* <NestedFieldArray
                nestIndex={index}
                {...{ control, register, errors, watch }}
              /> */}
            </li>
          );
        })}
      </ul>

      {/* <span className="counter">Render Count: {renderCount}</span> */}
    </ErrorBoundary>
  );
};
