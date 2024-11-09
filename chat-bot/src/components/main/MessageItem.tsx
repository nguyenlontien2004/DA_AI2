import React, { useCallback, useEffect, useRef } from 'react'
import chatAl from '../../../public/images/image 4.png'

type MessageItemProps = {
    messageType: 'al'|'user',
    messageText:string|undefined,
    messageListRef: React.RefObject<HTMLDivElement>;
}
const MessageItem = ({
    messageType,
    messageText,
    messageListRef
}:MessageItemProps) => {
    const textRef = useRef<HTMLDivElement>(null)

    // hàm để thay đổi chiều cao div của đoạn text
    const adjustTextMessageHeight = useCallback(() => {
        if (textRef.current  ) {
            textRef.current.style.height = 'auto';
          const computed = window.getComputedStyle(textRef.current);
          const height =
          textRef.current.scrollHeight +
            parseInt(computed.getPropertyValue('border-top-width'), 10) +
            parseInt(computed.getPropertyValue('padding-top'), 10) +
            parseInt(computed.getPropertyValue('padding-bottom'), 10) +
            parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    
            textRef.current.style.borderRadius = height> 80 ? '20px':'999px' ;
        //  if(wrapperRef.current){
        //   wrapperRef.current.style.borderRadius = height> 200 ? '20px':'999px' ;
        //  }
        }
      }, [textRef]);
    useEffect(()=>{
        adjustTextMessageHeight()
    },[adjustTextMessageHeight])
    useEffect(()=>{
        if(messageListRef.current){
            messageListRef.current.scrollIntoView({behavior:"smooth"})
        }
    },[messageListRef])
    return (
        <div ref={messageListRef} className={`flex gap-x-4 mb-6 ${messageType == 'al' && 'self-start'} ${messageType == 'user' && ' flex-row-reverse self-end'}`}>
            <div className={`${messageType == 'al'? 'size-10':'size-16'} flex-shrink-0`}>
               {messageType == 'al' && ( <img src={chatAl} alt="chatAl" className=' object-cover w-full h-full' />)}
               {messageType == 'user' && ( <div className=' flex justify-center items-center px-5 py-2 bg-[#4834D4] rounded-full font-semibold text-white'>you</div>)}
            </div>
            <div ref={textRef} className='max-w-2xl p-3 flex justify-center items-center bg-[#E2E1E5] '>
                <p >
                {messageText}
                </p>
            </div>
        </div>
    )
}

export default MessageItem