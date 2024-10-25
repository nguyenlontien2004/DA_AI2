
import Header from '../../components/headers/Header'
import { MessageList } from '../../components/main'
import ChatForm from '../../components/main/ChatForm'
import SidebarList from '../../components/sidebars/SidebarList'

const HomePage = () => {
  return (
    <div className='h-full bg-gray-900'>
      {/* Sidebar - left */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col h-screen overflow-y-hidden">
        <div className="flex grow flex-col bg-gray-900 pb-4 border-r border-gray-800 h-full">
          <div className="flex h-8 shrink-0 items-center"></div>
          <SidebarList />
        </div>
      </div>

      {/* Main - right  */}
      <div className="lg:pl-72 h-screen">
        <Header />
        <main className="flex flex-col">
          <div className="flex-grow pb-36">
            <div className="h-full">
              <MessageList />
            </div>
          </div>

          <div className="fixed w-full bottom-0 flex bg-gradient-to-t from-gray-800 to-gray-800/0 justify-center lg:pr-72">
            <ChatForm />
          </div>
        </main>
      </div>
    </div>
  )
}

export default HomePage