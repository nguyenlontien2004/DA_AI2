import { useCallback, useEffect, useRef, useState } from 'react';
import {
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';

type ChatFormProps = {
  divRef:React.RefObject<HTMLDivElement>;
}
const ChatForm = ({divRef}:ChatFormProps) => {
  const [query,setQuery] = useState<string>('')
  const otherRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const adjustTextareaHeight = useCallback(() => {
    if (otherRef.current  ) {
      otherRef.current.style.height = 'auto';
      const computed = window.getComputedStyle(otherRef.current);
      const height =
        otherRef.current.scrollHeight +
        parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        parseInt(computed.getPropertyValue('padding-bottom'), 10) +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10);

      otherRef.current.style.height = height > 150 ? '150px' : `${height}px`;
     if(wrapperRef.current){
      wrapperRef.current.style.borderRadius = height> 70 ? '20px':'999px' ;
     }
     if(divRef.current){
        divRef.current.style.paddingBottom = height> 100 ? '220px':'144px' ;
     }
    }
  }, [otherRef,wrapperRef,divRef]);
  useEffect(() => {
    adjustTextareaHeight();
  }, [query,adjustTextareaHeight]);
  return (
   
    <form
      className=' flex w-screen bg-gray-900 justify-center items-center p-4 sm:px-4 sm:py-5 '
    >
      <div ref={wrapperRef} className='bg-[#162159] w-full h-full max-w-3xl px-3 py-3 border border-[#676262] '>
        <label htmlFor="userInput" className="sr-only">
          Your message
        </label>
        <div className="flex w-full align-center justify-center items-center rounded-lg bg-gray-170 shadow-2xl">
          <textarea
            ref={otherRef}
            className=" flex items-center justify-center w-full bg-transparent h-full  text-xs sm:text-sm md:text-base  text-white focus:outline-none resize-none whitespace-pre-wrap overflow-y-auto"
            autoFocus={false}
            rows={1}
            maxLength={2048}
            id="userInput"
            name="userInput"
            placeholder={'Your message...'}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="inline-flex justify-center p-2 rounded-full cursor-pointer text-blue-500 hover:text-blue-300"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatForm;
