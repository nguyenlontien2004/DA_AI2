import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import { LoadingDots } from '@/components/other';
// import { classNames } from '@/utils/classNames';



const ListOfNamespaces = () => {

  return (
    <Menu as="div" className="w-full relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-700">
                  selectedNamespace
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-700 rounded-md bg-gray-800 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none">
           <div className="py-1" >
              <Menu.Item>
                  <p
                    className={'text-gray-400 hover:text-white hover:bg-gray-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'}
                    
                  >
                    chat
                  </p>
              </Menu.Item>
            </div>
            
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ListOfNamespaces;
