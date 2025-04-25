import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/react-time-picker-custom.css';

export const GradientBorderedTimeInput = (props: ReactDatePickerProps) => {
  // const [startDate, setStartDate] = useState<Date>();
  return (
    <ReactDatePicker
      {...props}
      dateFormat='h:mm a'
      // selected={startDate}
      // onChange={(date) => date && setStartDate(date)}
      // onChangeRaw={() => setStartDate(undefined)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption='Time'
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
