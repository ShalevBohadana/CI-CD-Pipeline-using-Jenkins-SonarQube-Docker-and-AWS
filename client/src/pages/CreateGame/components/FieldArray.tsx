import { ErrorBoundary } from 'react-error-boundary';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { BiPlus } from 'react-icons/bi';
import { GradientBorderedDateInput } from '../../../components/ui/GradientBorderedDateInput';
import { ShowInputError } from '../../../components/ui/ShowInputError';
import { ErrorFallback } from '../../../error/ErrorFallback';
import { logError } from '../../../error/logError';
import { ErrorBoundaryResetHandler } from '../../../error/utils';
import { GradientBorderedInput } from '../../Profile/components/GradientBorderedInput';
import { CreateGameFormInputs } from '../types';
import { GameSliderImageInput } from './GameSliderImageInput';

type Props<T extends FieldValues> = {
  control: Control<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
};

const handleErrorBoundaryReset: ErrorBoundaryResetHandler = (details) => {
  console.log(details);
};

export const FieldArray = ({
  control,
  register,
  setValue,

  watch,
  errors,
}: Props<CreateGameFormInputs>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sliders',
  });

  const handleAddNewSlider = () => {
    append({
      heading: '',
      imageUrl: '',
      createdAt: new Date(Date.now()),
    });
  };

  const handleRemoveSlider = (index: number) => {
    return async () => {
      remove(index);
    };
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={handleErrorBoundaryReset}
    >
      <section className='flex flex-wrap justify-between xl:justify-center relative isolate z-0 gap-4'>
        <h2 className='xl:absolute capitalize text-center font-semibold font-tti-demi-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'>
          game sliders
        </h2>
        <button
          type='button'
          onClick={handleAddNewSlider}
          className='xl:ml-auto px-2 xl:px-6 py-1.5 xl:py-2.5 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
        >
          <BiPlus className='w-5 h-5 shrink-0' />
          <span className='capitalize font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
            Add New Slider
          </span>
        </button>
      </section>
      <ul className='grid gap-8 grid-cols-1 minimal-scrollbar overflow-auto min-h-[16rem] max-h-[32rem]'>
        {fields.map((item, index) => (
          <li key={item.id} className='w-full grid xl:grid-cols-5 items-start gap-5 p-1 xl:p-1'>
            {/* Game image */}
            <div className='xl:col-span-3 grow w-full h-80 xl:h-96 xl:max-h-[20.625rem]'>
              <GameSliderImageInput
                defaultValue={item.imageUrl}
                index={index}
                setValue={setValue}
              />
              <div>
                <input
                  type='hidden'
                  {...register(`sliders.${index}.imageUrl`)}
                  className='sr-only'
                />
                <ShowInputError errors={errors} name={`sliders.${index}.imageUrl`} />
              </div>
            </div>

            <div className='xl:col-span-2 flex flex-col self-stretch gap-2'>
              <div className='grow'>
                <GradientBorderedInput
                  label='Title'
                  placeholder='Slider title'
                  defaultValue={item.heading}
                  errors={errors}
                  register={register(`sliders.${index}.heading`)}
                />
              </div>
              <div className='grow'>
                <GradientBorderedInput
                  label='Video URL'
                  placeholder='https://example.com/video=r4sYfg'
                  type='url'
                  errors={errors}
                  register={register(`sliders.${index}.videoUrl`)}
                />
              </div>

              <div className='flex flex-col gap-2 xl:gap-4 grow'>
                <label
                  htmlFor={`sliders-date-input-${index}`}
                  className='text-brand-black-10 text-sm xl:text-lg leading-none font-normal'
                >
                  <span className='first-letter:uppercase'>Created date</span>
                </label>

                <Controller
                  name={`sliders.${index}.createdAt`}
                  control={control}
                  defaultValue={item.createdAt}
                  rules={{ required: true }}
                  render={({ field: { onChange: gameDateChange, value } }) => (
                    <GradientBorderedDateInput
                      id={`sliders-date-input-${index}`}
                      placeholderText='Pick a date'
                      selected={value ? new Date(value) : null}
                      onChange={gameDateChange}
                    />
                  )}
                />

                <ShowInputError errors={errors} name={`sliders.${index}.createdAt`} />
              </div>

              <button
                type='button'
                onClick={handleRemoveSlider(index)}
                className='self-center justify-self-center p-.5 pr-1 rounded-[.25rem] inline-flex justify-center items-center gap-.5 bg-brand-black-60 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
              >
                <BiPlus className='w-5 h-5 shrink-0 rotate-45' />
                <span className='capitalize font-tti-regular font-normal text-xs leading-none line-clamp-1 text-start'>
                  Remove {watch(`sliders.${index}.heading`)} Slider
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </ErrorBoundary>
  );
};
