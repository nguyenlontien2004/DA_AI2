import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams để lấy chatId từ URL
import ChatItem from "./ChatItem";
import useCallApi from '../../../services/axiosService';

interface ListOfChatsProps {
  selectedChatId: number | null;
  setSelectedChatId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ListOfChats = ({ selectedChatId, setSelectedChatId }: ListOfChatsProps) => {
  const [chats, setChats] = useState([]);
  const callApi = useCallApi<{ name: string; id: number }[]>();
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const { chatId } = useParams(); // Lấy chatId từ URL
  
  // Cập nhật selectedChatId từ chatId trong URL khi component được render
  useEffect(() => {
    if (chatId) {
      setSelectedChatId(Number(chatId)); // Lưu chatId vào state khi URL thay đổi
    }
  }, [chatId, setSelectedChatId]);

  // Lấy lại danh sách cuộc trò chuyện mỗi khi component được render
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data:any = await callApi('/conversations');
        setChats(data);
      } catch (error) {
        // console.error('Error fetching data:', error); // Removed console statement
      }
    };

    fetchChats();
  }, []); // Chỉ gọi lại khi API hoặc các tham số thay đổi

  const handleChatClick = (chatId: number) => {
    setSelectedChatId(chatId); // Lưu chatId vào state

    // Thay đổi URL khi người dùng chọn một cuộc trò chuyện
    navigate(`/chat/${chatId}`); // Đường dẫn sẽ thay đổi thành /chat/{chatId}
  };

  return (
    <ul role="list" className="-mx-2 mt-2 px-2 pb-6 space-y-1">
      {chats?.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          onChatClick={handleChatClick}
          isSelected={selectedChatId !== null && chat.id === selectedChatId}
        />
      ))}
    </ul>
  );
};

export default ListOfChats;