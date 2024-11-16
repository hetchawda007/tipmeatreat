"use client"
import React, { useState , useEffect } from 'react'
import Image from 'next/image';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"


const Navbar = () => {
  const { data: session } = useSession()
  const [dropdown, setDropdown] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(true);


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
            : <Link href={'/login'}>
              <button type="button" suppressHydrationWarning={true} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outLine-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button></Link>}

        </div>
      </nav>

    </>
  )
}

export default Navbar
