import Chat from '../../components/common/Chat'
import Header from '../../components/user/userHeader/Header'

function Messages() {
  return (
    <div>
   <Header/>
   <Chat senderRole={'employeeId'} reciverRole={'employerId'}/>
    </div>
  )
}

export default Messages