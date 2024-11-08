import MessageItem from './MessageItem';

import { Message } from '../../types/message';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';



type MessageListProps = {
  messageListRef: React.RefObject<HTMLDivElement>;
  messages:Message[]
};

const MessageList = ({ messageListRef,messages }: MessageListProps) => {
    const notChatRef = useRef<HTMLDivElement>(null)
    const {chatId} = useParams()
    useEffect(()=>{
        console.log("ChatId", chatId)
        console.log("notChatRef", notChatRef)
        console.log("messages", messages)
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
          <div ref={notChatRef} className="py-5 text-center text-gray-500 ">Không có tin nhắn nào trong cuộc trò chuyện này.</div>
        ) : (
          messages?.map((message) => (
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
