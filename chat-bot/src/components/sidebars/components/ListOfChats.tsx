import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';

interface Chat {
  id: number;
  name: string;
}

const ListOfChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMDc4ODUyMSwianRpIjoiODQzYzliODItYzVlYS00YjU3LTg1OWYtNmNmMmRkZjM3ZmY5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNzMwNzg4NTIxLCJjc3JmIjoiZDlmNjVmNWItNTcxZS00Njc4LWI3YmMtOTk4YmIzNmVlYTBmIiwiZXhwIjoxNzMwNzk1NzIxfQ.UUdj92_1uMCZ6mxq47ffQuUVznSLWumwJ8ImneCJSDo';

    fetch('http://127.0.0.1:5000/api/conversations', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        setChats(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <ul role="list" className="-mx-2 mt-2 px-2 pb-6 space-y-1">
      {chats.map(chat => (
        <li
          key={chat.id}
          className={'text-gray-400 hover:text-white hover:bg-gray-800 group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'}
        >
          {chat.name}
          <div className="ml-auto">
            <button className="text-gray-300 hover:text-gray-400 ml-2">
              <PencilIcon className="h-4 w-4" />
            </button>
            <button className="text-red-500 hover:text-red-600 ml-2">
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListOfChats;