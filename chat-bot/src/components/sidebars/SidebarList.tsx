import { PlusCircleIcon } from '@heroicons/react/20/solid';
import Button from '../buttons/Button'
import { ListOfChats, ListOfNamespaces } from './components'
import { useNavigate } from 'react-router-dom';

const SidebarList = () => {
  const navigate = useNavigate()
  return (
    <nav className="flex flex-col h-full">
      <div>
        {/* New chat  */}
        <div className="px-6 space-y-3 mb-4">
          <Button
            buttonText="New chat"
            className=' py-3 text-[#4E8095] bg-white'
            icon={PlusCircleIcon}
          />
        </div>
      </div>

      <>
       {/* Your namespaces  */}
        <div className="px-6 w-full space-y-2 mb-6">
          <div className="text-xs sm:text-sm lg:text-xl font-semibold leading-6 text-white">
            Your namespaces
          </div>
          <ListOfNamespaces />
        </div>

    {/* Your chats  */}
        <div className="px-6 text-xs sm:text-sm lg:text-xl font-semibold leading-6 text-white">
          Your chats
        </div>
        <div className="px-6 overflow-y-auto h-[450px]">
          <ListOfChats />
        </div>
      </>
      <div className="px-6 mt-2">
        <button onClick={()=> navigate('/signin')} className='inline-flex bg-white/[27%] text-white items-center gap-x-1 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm w-full'>
          <span className='text-[#3694FF]'>Sign in</span>to save your chat history
        </button>
      </div>
    </nav>
  )
}

export default SidebarList