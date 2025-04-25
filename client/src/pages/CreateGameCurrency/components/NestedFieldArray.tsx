/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Control,
  FieldErrors,
  FieldValues,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { BiPlus } from 'react-icons/bi';

import { GradientFadePrimaryHr } from '../../../components/ui/GradientFadePrimaryHr';
import { GradientBorderedInput } from '../../Profile/components/GradientBorderedInput';
import { CreateGameCurrencyFormInputs } from '../Main';

type Props<T extends FieldValues> = {
  nestIndex: number;
  control: Control<T>;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
};

export const NestedFieldArray = ({
  nestIndex,
  control,
  register,
  watch,
  errors,
}: Props<CreateGameCurrencyFormInputs>) => {
  const { fields, remove, append } = useFieldArray({
    control,
    // @ts-ignore
    name: `dynamicFilters.${nestIndex}.children`,
  });

  const handleAddNewFilterOption = async () => {
    append({
      name: '',
      // type: OFFER_FILTER_TYPES.CHECKBOX_MULTIPLE,
      // fee: 0,
    });
    // console.log('Add new filter option');
  };

  const handleRemoveFilterOption = (index: number) => {
    return async () => {
      remove(index);
      // console.log('remove filter option');
    };
  };
  // console.log(errors);

  return (
    <div className='w-full grid items-start gap-5 col-span-12'>
      {fields.map((item, k) => {
        const serialNumber = k + 1;
        return (
          <div key={item.id} className='pl-2.5 xl:pl-5 flex items-start flex-wrap gap-4'>
            <span className='text-sm leading-none text-brand-primary-color-1'>{serialNumber}:</span>
            <GradientBorderedInput
              label='Option'
              placeholder='Option name'
              defaultValue={item.name}
              errors={errors}
              register={register(
                // @ts-ignore
                `dynamicFilters.${nestIndex}.children.${k}.name`
              )}
            />
            {/* <Controller
              // @ts-ignore
              name={`dynamicFilters.${nestIndex}.children.${k}.type`}
              control={control}
              defaultValue={item.type}
              render={({ field: { onChange, value } }) => (
                <SelectDropdown
                  label="type"
                  onChange={onChange}
                  options={FILTER_TYPE_OPTIONS}
                  // @ts-ignore
                  selectedDefaultValue={value}
                  errors={errors}
                  // name={name}
                />
              )}
            /> */}
            {/* <GradientBorderedInput
              label="Fee"
              placeholder="000"
              defaultValue={item.fee}
              type="number"
              step={0.01}
              errors={errors}
              icon={<UsdCurrencySymbol className="inline-flex pl-4" />}
              register={register(
                // @ts-ignore
                `dynamicFilters.${nestIndex}.children.${k}.fee`,
                {
                  valueAsNumber: true,
                }
              )}
            /> */}
            <div className=''>
              <button
                type='button'
                onClick={handleRemoveFilterOption(k)}
                className='self-center justify-self-center p-.5 pr-1 rounded-[.25rem] inline-flex justify-center items-center gap-.5 bg-brand-black-60 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
              >
                <BiPlus className='w-5 h-5 shrink-0 rotate-45' />
                <span className='capitalize font-tti-regular font-normal text-xs leading-none line-clamp-1 text-start'>
                  delete{' '}
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    watch(`dynamicFilters.${nestIndex}.children.${k}.name`)
                  }{' '}
                  option
                </span>
              </button>
            </div>

            {/* <button type="button" onClick={() => remove(k)}>
              Delete
            </button> */}

            {/* <NestedFieldArrayLevelTwo
              prevIndex={nestIndex}
              nestIndex={k}
              {...{ control, register, errors, watch }}
            /> */}
          </div>
        );
      })}

      {/* <button
        type="button"
        onClick={() =>
          append({
            name: '',
            type: OFFER_FILTER_TYPES.CHECKBOX_MULTIPLE,
            fee: 0,
          })
        }
      >
        add option
      </button> */}
      <button
        type='button'
        onClick={handleAddNewFilterOption}
        className='justify-self-center p-.5 pr-1 rounded-[.25rem] inline-flex justify-center items-center gap-.5 bg-brand-primary-color-1 text-white hover:text-brand-primary-color-1 hover:bg-brand-primary-color-light transition-all'
      >
        <BiPlus className='w-5 h-5 shrink-0' />
        <span className='capitalize font-tti-regular font-normal text-xs leading-none line-clamp-1 text-start'>
          add option
        </span>
      </button>
      <GradientFadePrimaryHr />
    </div>
  );
};
