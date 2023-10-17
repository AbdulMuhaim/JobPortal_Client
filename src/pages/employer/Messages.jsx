import Chat from '../../components/common/Chat'
import Header from '../../components/employer/Header'

function ChatPage() {
  return (
    <div>
    <Header/>
    <Chat senderRole={'employerId'} reciverRole={'employeeId'} />
    </div>
  )
}

export default ChatPage