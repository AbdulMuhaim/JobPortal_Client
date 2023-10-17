import Body from '../../components/user/userContact/Body'
import Header from '../../components/user/userHeader/Header'
import Map from '../../components/user/userContact/Map'

function Contact() {
  return (
    <div>
        <Header/>
        <Body/>
        <div className='flex justify-center items-center'>
       <h1 className='font-serif font-bold'>MYJOB MAIN OFFICES</h1>
        </div>
        <Map/>
    </div>
  )
}

export default Contact