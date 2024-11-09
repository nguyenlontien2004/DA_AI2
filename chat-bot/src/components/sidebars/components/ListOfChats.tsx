import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatItem from './ChatItem';
import useCallApi from '../../../services/axiosService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ListOfChatsProps {
  selectedChatId: number | null;
  setSelectedChatId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ListOfChats = ({ selectedChatId, setSelectedChatId }: ListOfChatsProps) => {
  const [chats, setChats] = useState<{ name: string; id: number }[]>([]);
  const callApi = useCallApi<{ name: string; id: number }[]>();
  const navigate = useNavigate();
  const { chatId } = useParams();

  // Cập nhật selectedChatId từ chatId trong URL khi component được render
  useEffect(() => {
    if (chatId) {
      setSelectedChatId(Number(chatId));
    }
  }, [chatId, setSelectedChatId]);

  // Lấy lại danh sách cuộc trò chuyện mỗi khi component được render
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data:any = await callApi('/conversations');
        setChats(data);
      } catch (error) {
        // Xử lý lỗi nếu cần
      }
    };

    fetchChats();
  }, []);

  const handleUpdateChat = async (chatId: number, newName: string) => {
    try {
      await callApi(`/conversation/${chatId}`, 'PUT', { name: newName });
  
      // Cập nhật danh sách cuộc trò chuyện
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chatId ? { ...chat, name: newName } : chat
        )
      );
      // toast.success('Tên cuộc trò chuyện đã được cập nhật!');
    } catch (error) {
      // toast.error('Có lỗi xảy ra khi cập nhật tên cuộc trò chuyện.');
    }
  };

  const handleChatClick = (chatId: number) => {
    setSelectedChatId(chatId);
    navigate(`/chat/${chatId}`);
  };

  const handleDeleteChat = async (chatId: number) => {
    toast(
      ({ closeToast }) => (
        <div style={{ padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px', fontSize: '14px', color: '#333' }}>
          <p>Bạn có chắc chắn muốn xóa cuộc trò chuyện này không?</p>
          <div>
            <button
              onClick={async () => {
                try {
                  await callApi(`/conversation/${chatId}`, 'DELETE');
                  setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
  
                  if (selectedChatId === chatId) {
                    setSelectedChatId(null);
                    navigate('/');
                  }
  
                  toast.success('Cuộc trò chuyện đã được xóa thành công!');
                } catch (error) {
                  toast.error('Có lỗi xảy ra khi xóa cuộc trò chuyện.');
                }
                closeToast();
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                marginRight: '8px',
                transition: 'background-color 0.3s',
              }}
            >
              Xác nhận
            </button>
            <button
              onClick={closeToast}
              style={{
                padding: '8px 16px',
                backgroundColor: 'gray',
                color: 'white',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      { position: 'top-center', autoClose: false }
    );
  };


  return (
    <ul role="list" className="-mx-2 mt-2 px-2 pb-6 space-y-1">
      {chats?.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          onChatClick={handleChatClick}
          onDelete={handleDeleteChat}
          onUpdate={handleUpdateChat}
          isSelected={selectedChatId !== null && chat.id === selectedChatId}
        />
      ))}
    </ul>
  );
};

export default ListOfChats;
