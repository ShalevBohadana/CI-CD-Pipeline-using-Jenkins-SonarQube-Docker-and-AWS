import React from 'react';
import { Dialog } from '@headlessui/react';

// יצירת הקומפוננטה פשוטה שמעבירה את כל ה-props
const DialogWrapper = (props) => {
  return <Dialog {...props} />;
};

// העברת כל תת-קומפוננטות
DialogWrapper.Panel = Dialog.Panel;
DialogWrapper.Title = Dialog.Title;
DialogWrapper.Description = Dialog.Description;

export { DialogWrapper as Dialog };
export default DialogWrapper;
