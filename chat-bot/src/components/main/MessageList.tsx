
import MessageItem from "./MessageItem";

interface message {
    id:number|string,
    type:string,
    text:string
}

type MessageListProps ={
    messageListRef: React.RefObject<HTMLDivElement>;
};
const messages = [
    {
        id:1,
        type:'user',
        text:'hello'
    },
    {
        id:2,
        type:'al',
        text:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni quis architecto sed, quas tenetur delectus, veritatis incidunt dolore, aliquid quia dolorem ipsum eaque! Debitis, neque. Ab veritatis illum possimus!'
    },
    {
        id:3,
        type:'user',
        text:'hi'
    },
    {
        id:4,
        type:'al',
        text:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni quis architecto sed, quas tenetur delectus, veritatis incidunt dolore, aliquid quia dolorem ipsum eaque! Debitis, neque. Ab veritatis illum possimus!'
    },
    {
        id:5,
        type:'user',
        text:'good morning'
    },
    {
        id:6,
        type:'al',
        text:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni quis architecto sed, quas tenetur delectus, veritatis incidunt dolore, aliquid quia dolorem ipsum eaque! Debitis, neque. Ab veritatis illum possimus!'
    },
    {
        id:7,
        type:'user',
        text:'lets go'
    },
    {
        id:8,
        type:'al',
        text:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni quis architecto sed, quas tenetur delectus, veritatis incidunt dolore, aliquid quia dolorem ipsum eaque! Debitis, neque. Ab veritatis illum possimus!'
    },
    {
        id:9,
        type:'user',
        text:'lets go'
    },
    {
        id:10,
        type:'al',
        text:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni quis architecto sed, quas tenetur delectus, veritatis incidunt dolore, aliquid quia dolorem ipsum eaque! Debitis, neque. Ab veritatis illum possimus!'
    },
    {
        id:11,
        type:'user',
        text:'lets go'
    },
]



function MessageList({messageListRef}:MessageListProps) {

    return (
        <>
           <div className=' overflow-y-auto '>
                <div className='flex flex-col px-4 pt-5'>
                    {messages.map((message:message) =>(
                        <MessageItem messageListRef={messageListRef} messageType={message.type =='al'?'al':'user'} messageText={message.text} key={message.id} />
                    ))}
                </div>
           </div>
        </>
    );
}

export default MessageList;
