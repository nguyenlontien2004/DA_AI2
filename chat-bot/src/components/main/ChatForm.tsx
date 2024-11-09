import { useCallback, useEffect, useRef, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useParams, useNavigate } from 'react-router-dom';
import useCallApi from '../../services/axiosService';
import { Message } from '../../types/message';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


type ChatFormProps = {
  divRef: React.RefObject<HTMLDivElement>;
  messages: Message[],
  setMessage: any
}

const ChatForm = ({ divRef, messages, setMessage }: ChatFormProps) => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const otherRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const callApi = useCallApi<any>();
  const { chatId } = useParams();
  const navigate = useNavigate();

  // Hàm điều chỉnh chiều cao của textarea khi người dùng nhập
  const adjustTextareaHeight = useCallback(() => {
    if (otherRef.current) {
      otherRef.current.style.height = 'auto';
      const computed = window.getComputedStyle(otherRef.current);
      const height =
        otherRef.current.scrollHeight +
        parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        parseInt(computed.getPropertyValue('padding-bottom'), 10) +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10);

      otherRef.current.style.height = height > 150 ? '150px' : `${height}px`;
      if (wrapperRef.current) {
        wrapperRef.current.style.borderRadius = height > 70 ? '20px' : '999px';
      }
      if (divRef.current) {
        divRef.current.style.paddingBottom = height > 100 ? '220px' : '144px';
      }
    }
  }, [otherRef, wrapperRef, divRef]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (query.trim()) {
      try {
        if (chatId) {
          await sendMessage(chatId);
        } else {
          const data:any = await callApi(`/chat/start`, 'POST', { message: query });
          if (data && data.conversation_id) {
            const newChatId = data.conversation_id;
            navigate(`/chat/${newChatId}`, { replace: true });
            await sendMessage(newChatId);
          }
        }
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    }
    setLoading(false);
  };

  const sendMessage = async (id: string) => {
    const now = new Date();
    const newUserMessage = {
      message: query,
      sender: 'user',
      message_id: `${now.getMilliseconds()}-${now.getSeconds()}-${now.getHours()}-${Math.random()}`,
    };
    setMessage([...messages, newUserMessage]);

    const data:any = await callApi(`/chat/message/${id}`, 'POST', { message: query });
    const newModelMessage = {
      message: data?.response,
      sender: 'model',
      message_id: `${now.getMilliseconds()}-${now.getSeconds()}-${now.getHours()}-${Math.random()}`,
    };
    setMessage([...messages, newUserMessage, newModelMessage]);
    setQuery('');
  };

  // Hàm xử lý sự kiện nhấn Enter
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey && !loading) {
      event.preventDefault();
      handleSubmit(event as any);
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [query, adjustTextareaHeight]);

  return (
    <form
      className="flex w-screen bg-gray-900 justify-center items-center p-4 sm:px-4 sm:py-5"
      onSubmit={handleSubmit}  // Gọi handleSubmit khi người dùng gửi tin nhắn
    >
      <div ref={wrapperRef} className="bg-[#162159] w-full h-full max-w-3xl px-3 py-3 border border-[#676262]">
        <label htmlFor="userInput" className="sr-only">
          Your message
        </label>
        <div className="flex w-full align-center justify-center items-center rounded-lg bg-gray-170 shadow-2xl">
          <textarea
            ref={otherRef}
            className="flex items-center justify-center w-full bg-transparent h-full text-xs sm:text-sm md:text-base text-white focus:outline-none resize-none whitespace-pre-wrap overflow-y-auto"
            autoFocus={false}
            rows={1}
            maxLength={2048}
            id="userInput"
            name="userInput"
            placeholder="Your message..."
            value={query}  // Đảm bảo giá trị của query được gán vào textarea
            onChange={(e) => setQuery(e.target.value)}  // Cập nhật query khi người dùng gõ
            onKeyDown={handleKeyDown}  // Gọi handleKeyDown khi nhấn phím
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center p-2 rounded-full cursor-pointer text-blue-500 hover:text-blue-300"
          >
            {loading ? (<><Spin indicator={<LoadingOutlined style={{ fontSize: 20, color: 'blue' }} spin />} /></>) : (<><PaperAirplaneIcon className="h-6 w-6" /></>)}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatForm;
