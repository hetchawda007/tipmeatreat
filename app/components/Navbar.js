"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"


const Navbar = () => {
  const { data: session } = useSession()
  const [dropdown, setDropdown] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth > 1024);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    setLoading(true)
  }, [session])

  return (
    <>
      <nav className='bg-slate-950 text-slate-300 flex h-[10vh] items-center justify-between px-12 sticky top-0 z-10 max-sm:px-5 max-sm:py-10'>
        <Link href={'/'} className='flex scale-1 items-center justify-center gap-3'>
          <Image className='rounded-full cursor-pointer h-auto w-auto max-md:h-12' width={60} height={75} src="/creatorrise.jpg" alt="logo-image" />
          <div className=' text-2xl font-bold max-sm:text-xl'>Tip me a treat</div>
        </Link>
        <div className='flex justify-evenly items-center'>

          {session ?
            <>
              <div className={`transition-all pt-3`} onMouseLeave={isSmallScreen ? () => setDropdown(false) : undefined} >

                <button onClick={() => setDropdown(!dropdown)} onMouseEnter={() => setDropdown(true)} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outLine-none focus:ring-blue-300 gap-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 max-sm:px-3 max-sm:py-2" type="button">Welcome<p className='max-sm:hidden'>{session.user.name}</p><svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
                </button>

                <div id="dropdownHover" className={`z-10 bg-white divide-y ${dropdown ? '' : "hidden"} absolute divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 max-sm:w-32`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                    <li>
                      <Link href={'/'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
                    </li>
                    <li>
                      <Link href={'/dashboard'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                      <Link href={'/' + session.user.name.replace(' ', '-')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                    </li>
                    <li className='cursor-pointer' onClick={() => signOut()}>
                      <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</div>
                    </li>
                  </ul>
                </div>

              </div>
            </>
            : loading ? <Link href={'/login'}>
              <button type="button" suppressHydrationWarning={true} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outLine-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button></Link> : 
              <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              Loading...
              </button>
              }

        </div>
      </nav>

    </>
  )
}

export default Navbar
