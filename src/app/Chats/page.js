'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavbarChats/page'
import { collection, getDocs, query, where } from "firebase/firestore";

import { auth } from '@/app/Config/Config';
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/Config/Config';
import { Button, Form, Input, InputNumber } from 'antd';
import Singlechat from '../components/NavbarChats/Singlechat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionDataOnce, useCollectionOnce, useDocument } from 'react-firebase-hooks/firestore';
import Loader from '../components/Loader/page';
import ChatWindow from '../components/ChatWindow/page';


const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};




/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


const Chats = () => {

    let router = useRouter();
    let [User, setUser] = useState("")
    let [userDetail, setUserDetail] = useState({})
    const [user, loading, error] = useAuthState(auth);
    const [usersSnapshot, loadingUsers, errorUsers] = useCollectionDataOnce(collection(db, "users"));
    let [chatWith, setChatWith] = useState(null)
    let [currentuser, setCurrentUser] = useState({})
    // const [currentUser, currentUserLoading, currentUserError] = useDocument(db,doc("users",user?.uid))


    useEffect(() => {
        if (user) {
            let getCurrentuser = async () => {
                const docRef = doc(db, "users", user?.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data().email);
                    let currUser = {
                        email: docSnap.data().email,
                        url: docSnap.data().url,
                        id: docSnap.data().url
                    }
                    setCurrentUser({ ...currUser })

                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            getCurrentuser()


        } else if (!user && !loading) {
            router.push('/')
        }
    }, [loading])
    console.log(user, loading, error)
    console.log("users==>", usersSnapshot, loadingUsers, errorUsers)
    // console.log("current user" , currentUser, currentUserLoading, currentUserError)

    // const onFinish = async (values) => {
    //     console.log(values);
    //     const citiesRef = collection(db, "users");
    //     const q = query(citiesRef, where("email", "==", values.user.email));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });

    //     if (querySnapshot.docs.length == 1) {

    //         let chatParticipants = [User.email, 'tfahad']
    //         chatParticipants = chatParticipants.sort()
    //         console.log(chatParticipants)

    //     } else {
    //         console.log('no such user')
    //         return
    //     }
    // };

    useEffect(() => {
        if (user) {






        }

    }, [User])
    return (
        

        <div className='h-screen flex flex-col'>
            {loading ? <Loader /> : <>

                <Navbar userEmail={user?.email} id={user?.uid} currentuser={currentuser} />
                <div className='w-full  flex h-full overflow-y-hidden bg-cyan-600 p-4 gap-x-1 rounded-xl'>
                    <div className='w-[25%] h-full bg-white overflow-y-scroll  no-scrollbar overflow-x-hidden p-0 rounded-xl'>

                        {usersSnapshot ? usersSnapshot.map((value, ind) => {
                            return (
                                <Singlechat

                                    key={ind}
                                    id={value.uid}
                                    onClick={() => { setChatWith(value) }}
                                    name={value.email}
                                    imgUrl={value.url}
                                    bool={value.id === chatWith?.id}

                                />
                            )
                        }) : null}





                    </div>


                    {chatWith ? <ChatWindow
                        chatWith={chatWith}
                        currentuser={currentuser}
                    /> : null}

                </div>
            </>}

        </div>

    )
}

export default Chats