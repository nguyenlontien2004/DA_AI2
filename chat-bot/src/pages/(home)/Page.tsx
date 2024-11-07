import { useRef, useState } from 'react'
import Header from '../../components/headers/Header'
import { MessageList } from '../../components/main'
import ChatForm from '../../components/main/ChatForm'
import SidebarList from '../../components/sidebars/SidebarList'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Message } from '../../types/message'
import { Message } from '../../types/message'
import useCallApi from '../../services/axiosService'
import { useParams } from 'react-router-dom'

const HomePage = () => {
  const divRef = useRef<HTMLDivElement>(null)
  const messageListRef = useRef<HTMLDivElement>(null)
  const { chatId } = useParams<{ chatId: string }>(); // Lấy chatId từ URL
  const [messages, setMessages] = useState<Message[]>([]);
  const callApi = useCallApi<Message[]>();

  // Hàm gọi API để lấy tin nhắn
  const fetchMessages = async () => {
    if (chatId) {
      try {
        const data = await callApi(`/message/${chatId}`, 'GET') ;
        setMessages(data);
      } catch (error) {
        setMessages([])
      }
    }
  };

  // Gọi hàm fetchMessages khi chatId thay đổi
  useEffect(() => {
    if (chatId) {
      fetchMessages();
    } else {
      setMessages([]); // Nếu không có chatId, xóa danh sách tin nhắn
    }

    // // Lắng nghe sự thay đổi của chatId trong URL
    // const handleStorageChange = () => {
    //   if (chatId) {
    //     fetchMessages();
    //   }
    // };

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      // Hủy bỏ event listener nếu có
    };
  }, [callApi, chatId]); // Chạy lại khi chatId thay đổi
  useEffect(() => {
    const message = localStorage.getItem('login_message');
    if (message) {
      toast.success(message, { autoClose: 2000 });
      setTimeout(() => {
        localStorage.removeItem('login_message');
      }, 2000);
    }
  }, []);
  

  return (
    <div className='h-full'>
      {/* Sidebar - left */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col h-screen overflow-y-hidden">
        <div className="flex grow flex-col  bg-gradient-to-b from-[#0A033A] to-[#0E0265] pb-4 border-r border-white h-full">
          <div className="flex h-8 shrink-0 items-center"></div>
          <SidebarList />
        </div>
      </div>

      {/* Main - right  */}
      <div className="lg:pl-72 h-screen">
        <Header />
        <main className="flex flex-col bg-gray-900">
          <div ref={divRef} className="flex-grow pb-36">
            <div className="h-full">
              <MessageList messageListRef={messageListRef} messages={messages}/>
            </div>
          </div>

          <div className="fixed w-full bottom-0 flex bg-gradient-to-t from-gray-800 to-gray-800/0 justify-center lg:pr-72">
            <ChatForm divRef={divRef} messages={messages} setMessage={setMessages}/>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}

export default HomePage;
