import { useCallback, useEffect, useRef } from 'react';
import {
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';


const ChatForm = () => {
  const otherRef = useRef<HTMLTextAreaElement>(null);
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

      otherRef.current.style.height = height > 250 ? '250px' : `${height}px`;
    }
  }, [otherRef]);
  useEffect(() => {
    adjustTextareaHeight();
  }, []);
  return (
    <form
      className="items-center w-screen justify-center flex p-4 sm:px-4 sm:py-10"
    >
      <label htmlFor="userInput" className="sr-only">
        Your message
      </label>
      <div className="flex w-full align-center justify-center max-w-3xl items-center rounded-lg bg-gray-170 shadow-2xl">
        <textarea
          ref={otherRef}
          className="flex items-center justify-center w-full text-xs sm:text-sm md:text-base rounded-lg border bg-gray-900 border-gray-700 placeholder-gray-400 text-white focus:outline-none resize-none whitespace-pre-wrap overflow-y-auto"
          autoFocus={false}
          rows={1}
          maxLength={2048}
          id="userInput"
          name="userInput"
          placeholder={'Your message...'}
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center p-2 rounded-full cursor-pointer text-blue-500 hover:text-blue-300"
      >
        <PaperAirplaneIcon className="h-6 w-6" />
      </button>
    </form>
  );
};

export default ChatForm;
