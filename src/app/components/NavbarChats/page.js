'use client'
import React from 'react';
import { Avatar, Space } from 'antd';
import Link from 'next/link';
import { signOut } from "firebase/auth";
import { auth, db } from '@/app/Config/Config';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';


const Navbar = ({ userEmail ,id,currentuser}) => {
 
let router = useRouter()

let signout =()=>{
    signOut(auth).then(() => {
        router.push('/')
      }).catch((error) => {
        // An error happened.
      });
}



    return (
        <div className='w-full bg-green-400 px-16 py-3 flex justify-between items-center'>
            <div className=''>
                <Avatar size={80} src={<img src={currentuser?.url} alt="avatar" />} />
            </div>

            <div className='flex items-center gap-x-5'>
                <span className='text-black hover:text-blue-100 cursor-pointer font-semibold text-lg '>{currentuser?.email}</span>
                <span  className='text-black hover:text-blue-100 cursor-pointer font-semibold text-lg'
                onClick={signout}
                >Signout</span>
            </div>
        </div>
    )
}

export default Navbar