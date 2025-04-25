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

import { GradientBorderedInput } from '../../Profile/components/GradientBorderedInput';
import { CreateGameCurrencyOfferFormInputs } from '../Main';

type Props<T extends FieldValues> = {
  control: Control<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
};

// let renderCount = 0;

export const DynamicItemsFieldArray = ({
  control,
  register,

  watch,
  errors,
}: Props<CreateGameCurrencyOfferFormInputs>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dynamicItems',
  });

  const handleAddNewItem = async () => {
    append({
      label: '',
      value: '',
    });
    // console.log('Add  New filter');
  };

  const handleRemoveFilter = (index: number) => {
    return async () => {
      remove(index);
      // console.log('remove filter');
    };
  };
  // eslint-disable-next-line no-plusplus
  // renderCount++;
  // console.log(errors);
  return (
    <>
      <section className='flex flex-wrap justify-between xl:justify-center relative isolate z-0 gap-4'>
        <h2 className='xl:absolute capitalize text-center font-semibold font-tti-demi-bold text-[clamp(1.25rem,4vw,2rem)] leading-tight'>
          Items
        </h2>
        <button
          type='button'
          onClick={handleAddNewItem}
          className='xl:ml-auto px-2 xl:px-6 py-1.5 xl:py-2.5 rounded-[.25rem] inline-flex justify-center items-center gap-1 xl:gap-2.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
        >
          <BiPlus className='w-5 h-5 shrink-0' />
          <span className='inline-block first-letter:capitalize font-tti-regular font-normal text-base leading-none line-clamp-1 text-start'>
            add new item
          </span>
        </button>
      </section>
      <ul className='grid gap-8 items-start grid-cols-1 minimal-scrollbar overflow-auto min-h-[16rem] max-h-[32rem]'>
        {fields.map((item, index) => {
          return (
            <li
              key={item.id}
              className='w-full flex flex-wrap sm:grid xl:grid-cols-4 items-start gap-5 p-1 xl:p-0'
            >
              <GradientBorderedInput
                label='Label'
                placeholder='Item label'
                defaultValue={item.label}
                errors={errors}
                register={register(`dynamicItems.${index}.label`)}
              />

              <GradientBorderedInput
                label='Value'
                placeholder='Item value'
                defaultValue={String(item.value)}
                errors={errors}
                register={register(`dynamicItems.${index}.value`)}
              />

              {/* <button type="button" onClick={() => remove(index)}>
                Delete filter
              </button> */}

              <button
                type='button'
                onClick={handleRemoveFilter(index)}
                className='self-center justify-self-center p-.5 pr-1 rounded-[.25rem] inline-flex justify-center items-center gap-.5 bg-brand-black-60 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
              >
                <BiPlus className='w-5 h-5 shrink-0 rotate-45' />
                <span className='capitalize font-tti-regular font-normal text-xs leading-none line-clamp-1 text-start'>
                  Remove{' '}
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    watch(`dynamicItems.${index}.label`)
                  }{' '}
                  item
                </span>
              </button>

              {/* <NestedFieldArray
                nestIndex={index}
                {...{ control, register, errors, watch }}
              /> */}
            </li>
          );
        })}
      </ul>

      {/* <span className="counter">Render Count: {renderCount}</span> */}
    </>
  );
};
