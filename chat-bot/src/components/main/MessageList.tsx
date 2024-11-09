import MessageItem from './MessageItem';

import { Message } from '../../types/message';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import chatAl from '../../../public/images/image 4.png'


type MessageListProps = {
  messageListRef: React.RefObject<HTMLDivElement>;
  messages:Message[]
};

const MessageList = ({ messageListRef,messages }: MessageListProps) => {
    const notChatRef = useRef<HTMLDivElement>(null)
    const {chatId} = useParams()
    useEffect(()=>{
       if(!chatId){
        if(notChatRef?.current){
            notChatRef.current.scrollTo({
                top: notChatRef.current.scrollHeight,
                behavior: 'smooth',
              });
        }
       }
        
    },[notChatRef,chatId])

  return (
    <div className='overflow-y-auto'>
      <div className='flex flex-col px-4 pt-5 min-h-[520px]'>
        {messages.length === 0 ? (
          <div ref={notChatRef} className="pt-5 max-w-3xl mx-auto w-full flex flex-col items-center">
            <div className='size-16 mb-4'>
              <img src={chatAl} alt="Al" className='w-full h-full object-cover' />
            </div>
            <h1 className='text-white font-bold text-3xl mb-4'>Xin chào, tôi là Al hỏi đáp Tiếng Việt</h1>
            <h5 className='text-white text-base'>Tôi được tạo ra nhằm mục đích hỗ trợ các câu hỏi và kiến thức liên quan đến tiếng việt</h5>
          </div>
        ) : (
          messages?.map((message:Message) => (
            <MessageItem
              messageListRef={messageListRef}
              messageType={message.sender === 'model' ? 'al' : 'user'}
              messageText={message.message}
              key={message.message_id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
