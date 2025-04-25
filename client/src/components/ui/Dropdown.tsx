import { HTMLProps, ReactNode, useRef, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';

import { twMergeClsx } from '../../utils/twMergeClsx';

type DropdownProps = {
  defaultLabel: string;
  leftIcon?: ReactNode;
  heightClassName?: string;
  options: string[];
  selectHandler: (value: string) => void;
} & Omit<HTMLProps<HTMLDivElement>, 'ref'>;

// const options = [
//   'Red',
//   'Orange',
//   'Yellow',
//   'Green',
//   'Cyan',
//   'Blue',
//   'Purple',
//   'Pink',
//   'Maroon',
//   'Black',
//   'White',
// ];

export const Dropdown = ({
  defaultLabel,
  leftIcon = '',
  heightClassName = 'h-full',
  options,
  selectHandler: onSelect,
  ...attributes
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            maxWidth: `${rects.reference.width}px`,
          });
        },
        // padding: 10,
      }),
    ],
  });

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const listContentRef = useRef(options);
  const isTypingRef = useRef(false);

  const click = useClick(context, { event: 'mousedown' });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    // This is a large list, allow looping.
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch: isOpen ? setActiveIndex : setSelectedIndex,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    dismiss,
    role,
    listNav,
    typeahead,
    click,
  ]);

  const selectedItemLabel = selectedIndex !== null ? options[selectedIndex] : undefined;

  const handleSelect = (index: number) => {
    // setSelectedIndex(index);
    // onSelect(selectedItemLabel as string);
    // setIsOpen(false);

    if (index !== selectedIndex) {
      setSelectedIndex(index);
      setIsOpen(false);

      if (index !== null) {
        const selectedValue = options[index];
        onSelect(selectedValue); // Call the provided callback with the selected value
      }
    }
  };

  // useEffect(() => {
  //   if (selectedIndex !== null) {
  //     const selectedValue = options[selectedIndex];
  //     onSelect(selectedValue);
  //   }
  // }, [options, selectedIndex, onSelect]);

  return (
    <>
      <div
        tabIndex={0}
        role='menuitem'
        ref={refs.setReference}
        aria-label='select-label'
        // aria-autocomplete="none"
        // style={{ width: 150, lineHeight: 2, margin: 'auto' }}
        {...getReferenceProps()}
        className={twMergeClsx(
          `w-full mx-auto flex items-center justify-between gap-2 cursor-pointer hover:text-brand-primary-color-1 transition-colors outline-none relative isolate rounded-md overflow-hidden gradient-bordered p-2 before:p-px before:rounded-md before:bg-gradient-bordered-deep ${attributes.className}`
        )}
      >
        {/* <IoIosSearch className="w-5 h-5" /> */}

        {leftIcon}

        <span className='grow line-clamp-1 capitalize'>{selectedItemLabel || defaultLabel}</span>
        <BsChevronDown className={`${isOpen ? 'rotate-180' : ''} shrink-0 transition-transform`} />
      </div>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                minWidth: 100,
                outline: 0,
              }}
              className='w-full bg-brand-black-100 py-0 relative isolate rounded-md overflow-hidden gradient-bordered before:p-px before:rounded-md before:bg-gradient-bordered-deep'
              {...getFloatingProps()}
            >
              <div
                className={`flex flex-col gap-1 relative minimal-scrollbar overflow-auto font-tti-medium text-base leading-none font-medium text-brand-black-30 ${heightClassName}`}
              >
                {options?.map((value, i) => (
                  <div
                    key={value}
                    ref={(node) => {
                      listRef.current[i] = node;
                    }}
                    role='option'
                    tabIndex={i === activeIndex ? 0 : -1}
                    aria-selected={i === selectedIndex && i === activeIndex}
                    className={`${
                      i === selectedIndex
                        ? 'bg-brand-primary-color-1/20 !border-brand-primary-color-1'
                        : ''
                    } ${
                      i === activeIndex ? 'text-brand-primary-color-1' : ''
                    } p-2 flex items-center justify-between outline-none border-y border-transparent hover:text-brand-primary-color-1 cursor-pointer capitalize transition-colors`}
                    {...getItemProps({
                      // Handle pointer select.
                      onClick() {
                        handleSelect(i);
                      },
                      // Handle keyboard select.
                      onKeyDown(event) {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          handleSelect(i);
                        }

                        if (event.key === ' ' && !isTypingRef.current) {
                          event.preventDefault();
                          handleSelect(i);
                        }
                      },
                    })}
                  >
                    {value}
                    <span
                      aria-hidden
                      className={
                        i === selectedIndex
                          ? `inline-flex w-1 h-4 rounded-lg bg-brand-primary-color-1`
                          : ''
                      }
                    >
                      {/* {i === selectedIndex ? ' ✓' : ''} */}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
