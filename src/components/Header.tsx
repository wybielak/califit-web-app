import { auth } from '../config/FirebaseConfig'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header() {

    const [profilePhoto, setProfilePhoto] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (auth!.currentUser!.photoURL !== null && auth!.currentUser!.photoURL !== undefined) setProfilePhoto(auth!.currentUser!.photoURL)
    }, [])

    return (
        <>
            <NavLink className='contents' to="/">
                <h3 className='z-30 m-5 absolute top-0 text-2xl font-bold text-gradient'>CaliFit 💪</h3>
            </NavLink>
            <div className='w-full top-0 fixed text-fade flex flex-row flex-nowrap items-center justify-between z-20'>
                <div className='flex flex-row flex-nowrap items-center justify-between'>
                    <NavLink className='contents' to="/profile">
                        <img className='m-4 w-11 h-11 border border-transparent rounded-3xl' src={profilePhoto} alt="" />
                    </NavLink>
                </div>
                {/* <p className='m-4' >{auth?.currentUser?.displayName}</p> */}
            </div>
        </>
    )
}
