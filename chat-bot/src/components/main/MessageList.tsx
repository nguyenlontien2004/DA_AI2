import MessageItem from './MessageItem';

import { Message } from '../../types/message';



type MessageListProps = {
  messageListRef: React.RefObject<HTMLDivElement>;
  messages:Message[]
};

const MessageList = ({ messageListRef,messages }: MessageListProps) => {



  // if (!chatId) {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <div className="text-center text-gray-500 font-semibold text-lg">
  //         Chưa có cuộc trò chuyện nào được chọn.
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className='overflow-y-auto'>
      <div className='flex flex-col px-4 pt-5'>
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">Không có tin nhắn nào trong cuộc trò chuyện này.</div>
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
