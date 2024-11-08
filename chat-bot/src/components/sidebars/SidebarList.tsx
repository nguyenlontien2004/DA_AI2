import { PlusCircleIcon } from '@heroicons/react/20/solid';
import Button from '../buttons/Button';
import { ListOfChats, ListOfNamespaces } from './components';
import useCallApi from '../../services/axiosService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

const SidebarList = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token');
  const callApi = useCallApi();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null); // Thêm state để lưu selectedChatId

  const handleLogout = async () => {
    try {
      await callApi('/auth/logout', 'POST');
      localStorage.clear();
      toast.success('Đăng xuất thành công!');
      navigate('/signin');
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau.');
    }
  };

  const handleNewChat = () => {
    setSelectedChatId(null); // Reset selectedChatId
    navigate('/'); // Chuyển hướng về HomePage (hoặc page khác bạn muốn)
  };

  return (
    <nav className="flex flex-col h-full">
      <div>
        <div className="px-6 space-y-3 mb-4">
          <Button
            buttonText="New chat"
            className="py-3 text-[#4E8095] bg-white"
            icon={PlusCircleIcon}
            onClick={handleNewChat}
          />
        </div>
      </div>

      <div className="px-6 w-full space-y-2 mb-6">
        <div className="text-xs sm:text-sm lg:text-xl font-semibold leading-6 text-white">
          Your namespaces
        </div>
        <ListOfNamespaces />
      </div>

      <div className="px-6 text-xs sm:text-sm lg:text-xl font-semibold leading-6 text-white">
        Your chats
      </div>
      <div className="px-6 overflow-y-auto h-[450px]">
        <ListOfChats selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} />
      </div>

      <div className="px-6 mt-2">
        <button
          onClick={() => (isLoggedIn ? handleLogout() : navigate('/signin'))}
          className={`inline-flex justify-center ${isLoggedIn ? 'bg-red-600' : 'bg-white/[27%]'} text-white items-center gap-x-1 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm w-full`}
        >
          <span className="text-white">
            {isLoggedIn ? 'Sign out' : 'Sign in'}
          </span>
          {!isLoggedIn && (
            <span className="text-[#3694FF]">to save your chat history</span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default SidebarList;
