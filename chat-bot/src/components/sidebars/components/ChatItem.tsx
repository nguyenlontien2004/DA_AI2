import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

type ChatItemProps = {
  chat: { name: string; id: number };
  onChatClick: (chatId: number) => void;
  onDelete: (chatId: number) => void;
  onUpdate: (chatId: number, newName: string) => void; // Hàm onUpdate để cập nhật tên cuộc trò chuyện
  isSelected: boolean;
};

const ChatItem: React.FC<ChatItemProps> = ({ chat, onChatClick, onDelete, onUpdate, isSelected }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(chat.name); // Lưu giá trị tên mới

  const handleUpdate = async () => {
    if (newName !== chat.name) {
      await onUpdate(chat.id, newName); // Gọi hàm onUpdate để cập nhật tên
    }
    setIsEdit(false); // Đóng chế độ chỉnh sửa
  };

  return (
    <li
      className={`${isSelected ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/[27%]'
        } group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer`}
      onClick={() => onChatClick(chat.id)}
    >
      {isEdit ? (
        <div className="flex items-center space-x-2">
          <input
            autoFocus={isEdit}
            value={newName}
            onChange={(e) => setNewName(e.target.value)} // Cập nhật tên khi thay đổi
            onBlur={handleUpdate} // Khi mất focus, lưu tên mới
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUpdate(); // Gọi hàm cập nhật khi nhấn Enter
              }
            }}
            type="text"
            className="w-40 h-6 outline-0 bg-transparent border rounded-md text-white "
          />
        </div>
      ) : (
        <span className='text-truncate'>{chat.name}</span>
      )}
      <div className="ml-auto">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện lan ra
            setIsEdit(true); // Chuyển sang chế độ chỉnh sửa
          }}
          className="text-gray-300 hover:text-gray-400 ml-2"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        {!isEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện lan ra
              onDelete(chat.id); // Gọi hàm onDelete khi nhấn vào nút xóa
            }}
            className="text-red-500 hover:text-red-600 ml-2"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </li>
  );
};

export default ChatItem;
