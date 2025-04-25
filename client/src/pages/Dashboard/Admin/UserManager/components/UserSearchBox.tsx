import { Fragment, useState } from 'react';
import { BiCheck, BiChevronDown } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { SearchIcon } from '../../../../../components/icons/icons';
import { useSearchUsersQuery } from '../../../../../redux/features/user/userApi';
import { Combobox } from '@headlessui/react';
import { Transition } from '@headlessui/react';

// const people = [
//   { id: 1, name: 'Wade Cooper' },
//   { id: 2, name: 'Arlene Mccoy' },
//   { id: 3, name: 'Devon Webb' },
//   { id: 4, name: 'Tom Cook' },
//   { id: 5, name: 'Tanya Fox' },
//   { id: 6, name: 'Hellen Schmidt' },
// ];

export const UserSearchBox = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [query, setQuery] = useState('');
  // console.log(query)
  const { data: userData } = useSearchUsersQuery(`search=${query}`);
  const people = userData?.data;
  const filteredPeople = people;
  // query === ''
  //   ? people
  //   : people?.filter((person) =>
  //       person.userName
  //         .toLowerCase()
  //         .replace(/\s+/g, '')
  //         .includes(query.toLowerCase().replace(/\s+/g, ''))
  //     );
  const navigate = useNavigate();
  const onSelect = (id: string) => {
    navigate(`?user=${id}`);
  };
  return (
    <form>
      <div className='relative isolate z-10 md:max-w-xs'>
        <Combobox value={selectedItem} onChange={setSelectedItem} name='searchUser'>
          <div className='relative'>
            <div className='relative w-full cursor-default overflow-clip rounded-lg flex flex-nowrap gap-1 items-center bg-brand-black-80 px-3'>
              <SearchIcon />
              <Combobox.Input
                className='w-full border-none py-2 xl:py-3 leading-5 text-white bg-transparent outline-none'
                displayValue={(person: { userName: string }) => person.userName}
                placeholder='Search User'
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className='flex items-center'>
                {({ open }) => (
                  <BiChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      open ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden='true'
                  />
                )}
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
              // leave="transition-all ease-in duration-100"
              // leaveFrom="opacity-100 scale-120"
              // leaveTo="opacity-0 scale-50"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-brand-black-80 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {filteredPeople?.length === 0 && query !== '' ? (
                  <div className='relative cursor-default select-none py-2 px-4 text-gray-400'>
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople?.map((person) => (
                    <Combobox.Option
                      onClick={() => onSelect(person.userId)}
                      key={person._id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-brand-primary-color-1 text-white' : 'text-gray-400'
                        }`
                      }
                      value={person.userName}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                          >
                            {person.userName}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-brand-primary-color-1'
                              }`}
                            >
                              <BiCheck className='h-5 w-5' aria-hidden='true' />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </form>
  );
};
