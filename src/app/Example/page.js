'use client'
import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../Config/Config';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

const Example = () => {
 
    let [messages, setMessages] = useState([])
   
    useEffect(() => {
        const q = query(collection(db, "conversations/imran@gmail.comizhar1@gmail.com/messages"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data());

            });
            console.log("Current cities in CA: ", cities);
            setMessages([...cities])

        });
    },[])

    return (
        <div>
            <button
                onClick={async () => {
                    const q = query(collection(db, "conversations/fahad@gmail.comshabbir@gmail.com/messages"), orderBy("createdAt", "desc"));

                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                    });

                }}
            >click</button>
            <button
                onClick={async () => {
                    await addDoc(collection(db, "conversations/fahad@gmail.comusman@gmail.com/messages"), {
                        createdAt: Timestamp.fromDate(new Date())
                        ,
                        createdBy: "Shabbir@gmail.com",
                        content: "muzamail"
                    });

                }}
            >
                add data
            </button>
            <button
                onClick={async () => {
                    await setDoc(doc(db, "conversations/fahad@gmail.comusman@gmail.com"), {
                        participant1: "shabbir@gmail.com",
                        participant2: "fahad@gmail.com"
                    });

                }}
            >
                edit doc
            </button>
            <>
                {messages?.map((value, index) => {
                    return (<div className={`flex flex-col                                                ${value.createdBy == "izhar1@gmail.com" ? "text-right" : "text-left"}`} key={index}><span className='self-end'>{value.content}</span></div>)
                })}
            </>
        </div>
    )
}

export default Example