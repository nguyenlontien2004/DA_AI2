import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useReload } from './ReloadContext';

interface Message {
  message_id: number;
  message: string;
  sender: string;
  timestamp: string;
  user_id: number;
}

const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { reload } = useReload();
  const messageId = 1;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMDc4ODUyMSwianRpIjoiODQzYzliODItYzVlYS00YjU3LTg1OWYtNmNmMmRkZjM3ZmY5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNzMwNzg4NTIxLCJjc3JmIjoiZDlmNjVmNWItNTcxZS00Njc4LWI3YmMtOTk4YmIzNmVlYTBmIiwiZXhwIjoxNzMwNzk1NzIxfQ.UUdj92_1uMCZ6mxq47ffQuUVznSLWumwJ8ImneCJSDo';

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/message/${messageId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMessages();
  }, [messageId, token, reload]);

  return (
    <div className="overflow-y-auto">
      {messages.map((msg) => (
        <div key={msg.message_id} className={msg.sender === 'YOU' ? 'bg-gray-700/50' : 'bg-gray-800'}>
          <div className="flex items-center justify-start max-w-full sm:max-w-4xl mx-auto overflow-hidden px-2 sm:px-4">
            <div className="flex flex-col w-full">
              <div className="w-full text-gray-300 p-2 sm:p-4 overflow-wrap break-words">
                <span
                  className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-xs sm:text-sm font-medium ring-1 ring-inset ${
                    msg.sender === 'YOU' ? 'bg-purple-400/10 text-purple-400 ring-purple-400/30' : 'bg-indigo-400/10 text-indigo-400 ring-indigo-400/30'
                  }`}
                >
                  {msg.sender}
                </span>
                <div className="mx-auto max-w-full">
                  <ReactMarkdown
                    className="markdown text-xs sm:text-sm md:text-base leading-relaxed"
                    remarkPlugins={[remarkGfm]}
                  >
                    {msg.message}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;