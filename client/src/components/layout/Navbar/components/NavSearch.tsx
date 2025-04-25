import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

interface NavSearchProps {
  isDesktop: boolean;
  onSearch?: (query: string) => void;
}

export const NavSearch = ({ isDesktop, onSearch }: NavSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  // Mobile Search UI
  if (!isDesktop) {
    return (
      <div className='relative'>
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className='p-2 rounded-full bg-brand-primary-color-1/20 
                   hover:bg-brand-primary-color-1/30 transition-colors'
          aria-label='Search'
        >
          <IoSearchOutline className='w-5 h-5' />
        </button>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className='fixed inset-0 z-50 bg-black/90 p-4'>
            <div className='max-w-lg mx-auto pt-16'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-white'>Search</h2>
                <button
                  onClick={clearSearch}
                  className='p-2 rounded-full hover:bg-brand-primary-color-1/20'
                >
                  <IoMdClose className='w-6 h-6' />
                </button>
              </div>

              <form onSubmit={handleSubmit} className='relative'>
                <input
                  type='search'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search...'
                  className='w-full h-12 pl-12 pr-12 rounded-lg 
                         bg-brand-black-120/90 
                         border border-brand-primary-color-1/30 
                         focus:border-brand-primary-color-1
                         text-white placeholder-gray-400
                         transition-all duration-300
                         focus:ring-2 focus:ring-brand-primary-color-1/20'
                  autoFocus
                />
                <IoSearchOutline
                  className='absolute left-4 top-1/2 transform -translate-y-1/2 
                           w-5 h-5 text-gray-400'
                />
                {searchQuery && (
                  <button
                    type='button'
                    onClick={() => setSearchQuery('')}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2
                             p-1 rounded-full hover:bg-brand-primary-color-1/20'
                  >
                    <IoMdClose className='w-4 h-4' />
                  </button>
                )}
              </form>

              {/* Recent Searches - Optional */}
              <div className='mt-6'>
                <h3 className='text-sm text-gray-400 mb-2'>Recent Searches</h3>
                <div className='space-y-2'>{/* Add recent searches here if needed */}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop Search UI
  return (
    <form onSubmit={handleSubmit} className='relative hidden lg:block max-w-md'>
      <input
        type='search'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search...'
        className='w-full h-10 pl-10 pr-4 rounded-lg 
                 bg-brand-black-120/90 
                 border border-brand-primary-color-1/30 
                 focus:border-brand-primary-color-1
                 text-white placeholder-gray-400
                 transition-all duration-300
                 focus:ring-2 focus:ring-brand-primary-color-1/20
                 min-w-[260px]'
      />
      <IoSearchOutline
        className='absolute left-3 top-1/2 transform -translate-y-1/2 
                 w-5 h-5 text-gray-400'
      />
      {searchQuery && (
        <button
          type='button'
          onClick={() => setSearchQuery('')}
          className='absolute right-3 top-1/2 transform -translate-y-1/2
                   p-1 rounded-full hover:bg-brand-primary-color-1/20'
        >
          <IoMdClose className='w-4 h-4' />
        </button>
      )}
    </form>
  );
};

export default NavSearch;
