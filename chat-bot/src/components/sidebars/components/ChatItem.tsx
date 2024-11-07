import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

type ChatItemProps = {
  chat: { name: string; id: number };
  onChatClick: (chatId: number) => void;
  isSelected: boolean; // Nhận prop isSelected từ parent
};

const ChatItem: React.FC<ChatItemProps> = ({ chat, onChatClick, isSelected }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <li
      className={`${
        isSelected ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/[27%]'
      } group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer`}
      onClick={() => onChatClick(chat.id)} // Gọi hàm khi người dùng nhấp vào mục
    >
      {isEdit ? (
        <input
          autoFocus={isEdit}
          onBlur={() => setIsEdit(false)}
          type="text"
          className="w-40 h-6 outline-0 bg-transparent border rounded-md text-white"
          defaultValue={chat?.name}
        />
      ) : (
        <span>{chat?.name}</span>
      )}
      <div className="ml-auto">
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="text-gray-300 hover:text-gray-400 ml-2"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        {!isEdit && (
          <button className="text-red-500 hover:text-red-600 ml-2">
            <TrashIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </li>
  );
};

export default ChatItem;
