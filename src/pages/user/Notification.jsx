import Header from '../../components/user/userHeader/Header'
import Notifications from '../../components/user/userNotifications/Notifications'

function Notification() {
  return (
    <div>
    <Header/>
    <div className='container mx-auto p-2'>
    <Notifications/>
    </div>
    </div>
  )
}

export default Notification