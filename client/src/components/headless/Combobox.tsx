import React from 'react';
import { Combobox } from '@headlessui/react';

// יצירת הקומפוננטה פשוטה שמעבירה את כל ה-props
const ComboboxWrapper = (props) => {
  return <Combobox {...props} />;
};

// העברת כל תת-קומפוננטות
ComboboxWrapper.Input = Combobox.Input;
ComboboxWrapper.Options = Combobox.Options;
ComboboxWrapper.Option = Combobox.Option;
ComboboxWrapper.Button = Combobox.Button;

export { ComboboxWrapper as Combobox };
export default ComboboxWrapper;
