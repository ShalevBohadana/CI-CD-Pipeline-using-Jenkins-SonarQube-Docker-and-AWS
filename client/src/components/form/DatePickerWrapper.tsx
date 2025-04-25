import React from 'react';
import ReactDatePickerBase from 'react-datepicker';
import type { ReactDatePickerProps } from 'react-datepicker';

type DatePickerWrapperProps = {
  [K in keyof ReactDatePickerProps]: ReactDatePickerProps[K];
};

const DatePickerComponent =
  ReactDatePickerBase as unknown as React.ComponentType<DatePickerWrapperProps>;

export { DatePickerComponent as DatePicker };
