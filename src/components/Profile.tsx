
import { useEffect, useState } from 'react'
import BottomMenu from './BottomMenu'
import Header from './Header'
import { auth } from '../config/FirebaseConfig'
import { NavLink } from 'react-router-dom'
import { useStore } from '../mobx/Store'
import { observer } from 'mobx-react-lite'

export default observer(function Profile() {

  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(undefined)

  const {appStorage} = useStore()

  useEffect(() => {
    if (auth!.currentUser!.photoURL !== null && auth!.currentUser!.photoURL !== undefined) setProfilePhoto(auth!.currentUser!.photoURL)
  }, [])

  return (
    <>  
    <Header />
            <div className='mt-24 flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <img className='w-24 h-24 rounded-full' src={profilePhoto} alt="" />
                    <h2 className='my-3 font-bold'>{auth!.currentUser!.displayName}</h2>
                    <p className='mb-7'>{auth!.currentUser!.email}</p>
                </div>

                <div className='mb-7 flex flex-col items-center justify-center'>
                  <button className='mb-2 bg-dark w-52 h-10 flex items-center justify-center border border-transparent rounded-md' type='button' onClick={() => appStorage.beginNewWorkout()}>
                    Rozpocznij nowy trening
                  </button>
                  <p className='text-center'>Rozpoczęcie nowego treningu usuwa wszystkie ćwiczenia z podglądu treningu.</p>
                </div>

                <NavLink to='/'><button className='m-4 mb-20 h-10 p-2 cursor-pointer bg-dark text-light rounded' type='button' onClick={appStorage.logOut}>Wyloguj</button></NavLink>

            </div>
            <BottomMenu />

            <div className='m-auto relative bottom-1 z-10 text-xs opacity-50'>Created by DNw 2024</div>
        </>
  )
})
