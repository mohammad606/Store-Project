'use client'
import Link from "next/link";
import LogOutIcon from "@/app/components/common/icons/LogOutIcon";
import MenuIcon from "@/app/components/common/icons/MenuIcon";
import {sinOut} from "@/services/AuthService";
import Swal from "sweetalert2";


const Nav = ()=>{

    const handleLogOut = ()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't Logout!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                return sinOut()
            }})
    }

    return (
        <div className="navbar bg-base-100 mb-3 bg-sky-400/50 rounded-b-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                       <MenuIcon className='w-8 h-8'/>
                    </div>
                    <ul tabIndex={0} className="menu  menu-xl dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href={'/pages/dashboard'}>Dashboard</Link></li>
                        <li><Link href={'/pages/home'}>Home</Link></li>
                        <li><Link href={'/pages/all-order'}>OutPut</Link></li>
                        <li><Link href={'/pages/all-received'}>Input</Link></li>
                        <li><Link href={'/pages/store'}>Store</Link></li>
                        <li><Link href={'/pages/inventory'}>Inventory</Link></li>


                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link href={'/pages/home'} className="btn btn-ghost text-xl">Mohammad</Link>
            </div>
            <div className="navbar-end">
                <button type={'button'} className="btn btn-ghost btn-circle pl-1">
                    <div className="indicator" onClick={handleLogOut}>
                        <LogOutIcon className='h-8 w-8'/>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Nav