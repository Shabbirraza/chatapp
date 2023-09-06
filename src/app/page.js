'use client'
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect } from "react";
import { auth } from "./Config/Config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
// import SearchInput from "./components/test";
// import Head from "next/head";



export default function Home() {
  const [user, loading, error] = useAuthState(auth)
  console.log(user, loading, error)
  let router = useRouter()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // router.push('/Chats')

      } else {

      }
    });
  }, [])
  return (<>

    <div className='h-screen pt-10 '>
      {/* <SearchInput /> */}
      <h1 className='text-5xl sm:text-8xl text-cyan-950 text-center font-extrabold p-2 '>ChatAppp</h1>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-8xl text-5xl md:text-6xl lg:text-8xl mb-4 font-extrabold text-gray-900">ChatApp

            </h1>
            <p className="mb-8 leading-relaxed text-4xl font-extrabold">Trusted,Encrypted & Secure</p>
            {user && !loading ? <div className="flex justify-center"><button className="grow text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 rounded text-lg"><Link href='/Chats'>Chat</Link></button></div>
              :!user && loading?null: <div className="flex justify-center">

                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 rounded text-lg"><Link href='/Login'>Login</Link></button>
                <button className="ml-4 inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-900 rounded text-lg"><Link href='/Signup'>Create an Account</Link></button>
              </div>
            }
            {/* <div className="flex justify-center">
             
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 rounded text-lg"><Link href='/Login'>Login</Link></button>
              <button className="ml-4 inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-900 rounded text-lg"><Link href='/Signup'>Create an Account</Link></button>
            </div> */}
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded-xl" alt="hero" src="https://media.istockphoto.com/id/1488105257/photo/chatbot-powered-by-ai-transforming-industries-and-customer-service-yellow-chatbot-icon-over.webp?b=1&s=170667a&w=0&k=20&c=AV64kFBktVFkU1e5DBUMGgpp0bSjEtEzvZpPKZYbsAE=" />
          </div>
        </div>
      </section>


    </div>
  </>
  )
}
