import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';




const ListOfChats = () => {


  return (
    <ul role="list" className="-mx-2 mt-2 px-2 pb-6 space-y-1">
       <li
          className={'text-gray-400 hover:text-white hover:bg-gray-800 group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'}
        >
            chat 1
            <div className="ml-auto">
              <button
                className="text-gray-300 hover:text-gray-400 ml-2"
              >
                <PencilIcon className="h-4 w-4" />
              </button>

              <button
                className="text-red-500 hover:text-red-600 ml-2"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
        </li>
        <li
          className={'text-gray-400 hover:text-white hover:bg-gray-800 group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'}
        >
            chat 2
            <div className="ml-auto">
              <button
                className="text-gray-300 hover:text-gray-400 ml-2"
              >
                <PencilIcon className="h-4 w-4" />
              </button>

              <button
                className="text-red-500 hover:text-red-600 ml-2"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
        </li>
        <li
          className={'text-gray-400 hover:text-white hover:bg-gray-800 group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'}
        >
            chat 3
            <div className="ml-auto">
              <button
                className="text-gray-300 hover:text-gray-400 ml-2"
              >
                <PencilIcon className="h-4 w-4" />
              </button>

              <button
                className="text-red-500 hover:text-red-600 ml-2"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
        </li>
    </ul>
  );
};

export default ListOfChats;
