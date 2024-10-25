import { PlusCircleIcon } from '@heroicons/react/20/solid';
import Button from '../buttons/Button'
import { ListOfChats, ListOfNamespaces, ModelTemperature, SourceDocumentsToggle } from './components'

const SidebarList = () => {
  return (
    <nav className="flex flex-col h-full">
    <div>
      {/* {selectedNamespace && (
        
      )} */}
      <div className="px-4 space-y-3 mb-4">
          <SourceDocumentsToggle/>

          <ModelTemperature />

          <Button
            buttonType="primary"
            buttonText="New chat"
            icon={PlusCircleIcon}
          />
        </div>
    </div>

    <>
      <div className="px-4 w-full space-y-2 mb-6">
        <div className="text-xs sm:text-sm font-semibold leading-6 text-blue-400">
          Your namespaces
        </div>
        <ListOfNamespaces/>
      </div>

      <div className="px-4 text-xs sm:text-sm font-semibold leading-6 text-blue-400">
        Your chats
      </div>
      <div className="px-4 flex-grow overflow-y-auto">
          <ListOfChats/>
      </div>
    </>
  </nav>
  )
}

export default SidebarList