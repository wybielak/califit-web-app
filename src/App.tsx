import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './config/FirebaseConfig'
import Auth from './components/Auth'
import UserContent from './components/UserContent'

function App() {
  
  const [user] = useAuthState(auth)

  return (
    <>
      <div className='flex flex-col flex-nowrap items-center justify-center'>
        {user == null ? <Auth/> : <UserContent />}
      </div>
    </>
  )
}

export default App
