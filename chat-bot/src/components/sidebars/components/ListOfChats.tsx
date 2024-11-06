import ChatItem from "./ChatItem";

const chats = [
  {name:"Chat 1"},
  {name:"Chat 2"},
  {name:"Chat 3"},
  {name:"Chat 4"},
  {name:"Chat 5"},
]
const ListOfChats = () => {
  return (
    <ul role="list" className="-mx-2 mt-2 px-2 pb-6 space-y-1">
      {/* chat item  */}
      {chats?.map((chat:{name:string}) =>(
        <ChatItem chat={chat} key={chat.name} />
      ))}
    </ul>
  );
};

export default ListOfChats;
