import { DatePicker } from '../form/DatePickerWrapper';
import type { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/react-date-picker-custom.css';

export const GradientBorderedDateInput = (props: Omit<ReactDatePickerProps, 'children'>) => {
  return (
    <DatePicker
      {...props}
      dateFormat='dd/MM/yy'
      // onChangeRaw={() => setStartDate(undefined)}
      showTimeSelect={false}
      todayButton='Today'
      dropdownMode='select'
      isClearable
      shouldCloseOnSelect
      clearButtonClassName='!hidden'
      className='w-full h-full leading-none rounded-[.65rem] py-2.5 xl:py-3.5 px-2 xl:px-4 bg-transparent outline-none placeholder:text-base placeholder:leading-none placeholder:font-normal disabled:text-brand-black-30 disabled:cursor-not-allowed read-only:cursor-not-allowed invalid:text-red-600 transition-colors'
      wrapperClassName='relative w-full h-full isolate overflow-hidden gradient-bordered before:pointer-events-none before:p-px rounded-[.65rem] before:rounded-[0.65rem] before:bg-gradient-bordered-deep flex flex-row justify-between items-center gap-2'
    />
  );
};
