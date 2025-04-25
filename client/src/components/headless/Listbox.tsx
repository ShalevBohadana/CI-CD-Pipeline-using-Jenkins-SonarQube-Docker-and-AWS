import React from 'react';
import { Listbox } from '@headlessui/react';

// יצירת הקומפוננטה פשוטה שמעבירה את כל ה-props
const ListboxWrapper = (props) => {
  return <Listbox {...props} />;
};

// העברת כל תת-קומפוננטות
ListboxWrapper.Button = Listbox.Button;
ListboxWrapper.Options = Listbox.Options;
ListboxWrapper.Option = Listbox.Option;
ListboxWrapper.Label = Listbox.Label;

export { ListboxWrapper as Listbox };
export default ListboxWrapper;
