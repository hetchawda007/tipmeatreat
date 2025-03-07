"use client"
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Script from 'next/script'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateuserdata, getuser, checkcredentials } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getpayment } from '@/actions/useractions'
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { data: session } = useSession()
  const [form, setform] = useState({ title: "", profilepic: "", coverpic: "", razorpayid: "", razorpaysecret: "" })
  const [payments, setpayments] = useState([])
  const router = useRouter()

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const getuserdata = async () => {
    let name = session.user.name
    let u = await getuser(name)
    setform({ ...form, title: u[0]?.title || '', profilepic: u[0]?.profilepic || '', coverpic: u[0]?.coverpic || '', razorpayid: u[0]?.razorpayid || '', razorpaysecret: u[0]?.razorpaysecret || '' })
  }

  useEffect(() => {
    getdata()
  }, [session])

  const getdata = async () => {
    if (!session || !session.user) return;
    let name = session.user.name
    let paymentsdata = await getpayment(name)
    setpayments(paymentsdata)
    return payments
  }

  useEffect(() => {
    if (session) {
      getuserdata()
    }
  }, [session])


  const handlesubmit = async () => {

    const check = await checkcredentials(form.razorpayid, form.razorpaysecret)

    if (check.result === false) {
      toast.error('Invalid Razorpay credentials')
      return
    }

    let res = await updateuserdata(form, session.user.name)
    if (res.success) {
      toast.success('Your profile is updated', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    else {
      alert(res.error)
    }
  }

  useEffect(() => {
    console.log(session);
    if (!session || !session.user) {
      router.push("/login");
    }
  }, [session, router])

  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='min-h-[85vh] pb-20 bg-gradient-to-r from-gray-700 via-gray-900 to-black'>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex justify-center items-center gap-6 py-8 w-full">
          {session?.user ? <> <motion.img whileHover={{ scale: 1.1 }} className="rounded-full w-14 shadow-lg" src={`${session?.user?.image}`} alt="userimage" />
            <div className="flex flex-col gap-1">
              <div className="text-2xl leading-none font-bold text-white">Welcome {session?.user?.name}</div>
              <div className="text-lg leading-none text-neutral-300 font-semibold">{session?.user?.email}</div>
            </div></>
            : <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <div className="flex gap-5">
                <Skeleton circle={true} height={60} width={60} />
                <Skeleton height={55} width={320} />
              </div>
            </SkeletonTheme>}
        </motion.div>

        <div className='w-[60%] mx-auto text-xl font-semibold text-center pb-8 text-white max-lg:w-[85%] max-sm:w-[90%] max-sm:text-2xl'>You can start setting up your profile here {session?.user?.name ? session.user.name : ''} :)</div>

        <form className='w-[35%] mx-auto flex flex-col gap-5 max-lg:w-[70%] max-sm:w-[95%]' onSubmit={(e) => { e.preventDefault(); handlesubmit(); }}>

          <div className='flex flex-col gap-1 max-sm:w-full'>
            <label className='self-start text-white' htmlFor="title">Your Title</label>
            <input onChange={handlechange} suppressHydrationWarning={true} value={form.title} className='rounded-xl bg-gray-800 text-white pl-2 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300' type="text" name="title" required id="title" />
          </div>
          <div className='flex flex-col gap-1 max-sm:w-full'>
            <label className='self-start text-white' htmlFor="profilepic">Profile Url</label>
            <input onChange={handlechange} suppressHydrationWarning={true} className='rounded-xl bg-gray-800 text-white pl-2 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300' value={form.profilepic} type="text" name="profilepic" id="profilepic" />
          </div>
          <div className='flex flex-col gap-1 max-sm:w-full'>
            <label className='self-start text-white' htmlFor="coverpic">Banner Url</label>
            <input onChange={handlechange} suppressHydrationWarning={true} className='rounded-xl bg-gray-800 text-white pl-2 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300' value={form.coverpic} type="text" name="coverpic" id="coverpic" />
          </div>
          <div className='flex flex-col gap-1 max-sm:w-full'>
            <label className='self-start text-white' htmlFor="Razorpay">Razorpay Id</label>
            <input onChange={handlechange} suppressHydrationWarning={true} value={form.razorpayid} className='rounded-xl bg-gray-800 text-white pl-2 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300' type="password" name="razorpayid" required id="razorpayid" />
          </div>
          <div className='flex flex-col gap-1 max-sm:w-full'>
            <label className='self-start text-white' htmlFor="Razorpay">Razorpay Secret</label>
            <input onChange={handlechange} suppressHydrationWarning={true} value={form.razorpaysecret} className='rounded-xl bg-gray-800 text-white pl-2 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300' type="password" name="razorpaysecret" required id="razorpaysecret" />
          </div>
          <div className='mx-auto'>
            <motion.button whileHover={{ scale: 1.1 }} suppressHydrationWarning={true} className="mt-4 relative cursor-pointer inline-flex items-center justify-center p-0.5 mb-7 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 shadow-lg" disabled={form.title.length < 4 || form.razorpayid.length < 4 || form.razorpaysecret.length < 4 || form.title.length > 50}>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
              </span>
            </motion.button>
          </div>
        </form>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="supporters bg-gray-900 px-10 pt-10 pb-20 mx-auto mt-10 rounded-xl w-[48%] flex flex-col gap-5 items-center max-lg:w-[95%] max-lg:px-5 shadow-lg">
          <h2 className='text-3xl font-bold text-white max-sm:text-xl'>All Contributors</h2>
          <ul className='flex flex-col gap-5 max-lg:p-2'>
            {payments.length == 0 && <li className='text-bold text-xl text-wrap text-white max-sm:text-lg'> No Payments Yet</li>}
            {payments.map((item, id) =>
              <li key={id} className='text-semibold text-wrap flex gap-5 items-center text-white max-sm:text-sm'>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Image className='w-8 cursor-pointer max-sm:w-6' src="/user.gif" alt="user" width={200} height={200} />
                </motion.div>
                <div><span className='font-bold'>{item.name}</span> just contributed <span className='font-bold'>₹{item.amount}</span><b>. {item.message}</b></div>
              </li>)}

          </ul>
        </motion.div>
      </div>
    </>
  )
}

export default Dashboard;