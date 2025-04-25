import React from 'react';
import { Transition } from '@headlessui/react/dist/components/transition/transition';

// יצירת הקומפוננטה פשוטה שמעבירה את כל ה-props ל-Transition המקורי
const TransitionWrapper = (props) => {
  return <Transition {...props} />;
};

// העברת כל תת-קומפוננטות
TransitionWrapper.Child = Transition.Child;
TransitionWrapper.Root = Transition.Root;

export { TransitionWrapper as Transition };
export default TransitionWrapper;
