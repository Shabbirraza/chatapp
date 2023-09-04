"use client"
import { db } from '@/app/Config/Config'
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

const ChatWindow = ({ chatWith, currentuser }) => {
    let [inputVal, setInputval] = useState('')
    let [messages, setMessages] = useState([])
    let handlechange = (e) => {
        setInputval(e.target.value)
        console.log(inputVal)
    }
    console.log("current user in chat window", currentuser?.email)
    console.log("current user in chat window", chatWith?.email)
    let arr = [currentuser?.email, chatWith?.email]
    let newArr = arr.sort()
    let newRef = `conversations/${newArr[0] + newArr[1]}/messages`


    useEffect(() => {
        console.log(newRef)
        const q = query(collection(db, newRef), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data());

            });
            console.log("Current cities in CA: ", cities.reverse());

            setMessages([...cities])

        });
    }, [chatWith?.email])



    return (
        <div className='h-full w-[75%] bg-purple-100 flex flex-col rounded-xl   items-center'>
            <div className='grow w-full  bg-blue-100 rounded-xl  overflow-y-scroll  no-scrollbar overflow-x-hidden p-3'>
                {messages.length > 0? messages?.map((value, index) => {
                    return (<div className={`flex flex-col my-1`} key={index}>
                        <span className={`${value.createdBy == currentuser?.email ? "self-end" : "self-start"} bg-green-400 text-[9px] text-white p-1 rounded-lg break-all`}>{value.content}</span></div>)
                }):<div className='text-center font-bold text-6xl text-white'>start chat</div>}

            </div>
            <div className='w-[80%] flex p-1'>
                <input value={inputVal} onChange={handlechange} placeholder={`send message to ${chatWith ? `${chatWith?.email}` : ''}`} className='p-2 rounded-xl border-2 border-black  w-[70%]' />
                <button className='p-2 bg-green-500 text-white rounded-xl ml-2'
                    onClick={async () => {
                        if(inputVal.length > 0){
                            await addDoc(collection(db, newRef), {
                                createdAt: Timestamp.fromDate(new Date())
                                ,
                                createdBy: currentuser?.email,
                                content: inputVal
                            })
                                .then(() => {
                                    console.log("chat added")
                                    setInputval('')
                                });
                        }
                       

                    }}
                >Send</button>
            </div>
        </div>
    )
}

export default ChatWindow