import { CgProfile } from "react-icons/cg"
import { FaHome } from "react-icons/fa"
import { NavLink } from "react-router-dom"


export default function BottomMenu() {
    return (
        <>
            <div className='z-30 w-screen fixed text-fade-rev bottom-0 flex flex-row flex-nowrap items-center justify-around'>
                <button type='button' className="text-3xl m-4"><NavLink className={({ isActive }) => { return isActive ? 'text-active' : 'text-light' }} to="/"><FaHome /></NavLink></button>
                <button type='button' className="text-3xl m-4"><NavLink className={({ isActive }) => { return isActive ? 'text-active' : 'text-light' }} to="/profile"><CgProfile /></NavLink></button>
            </div>
        </>
    )
}
