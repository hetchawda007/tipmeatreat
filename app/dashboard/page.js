"use client"
import React from 'react'
import Script from 'next/script'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateuserdata, getuser } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { data: session } = useSession()
  const [control, setcontrol] = useState(false)
  const [form, setform] = useState({ title: "", profilepic: "", coverpic: "", razorpayid: "", razorpaysecret: "" })
  const router = useRouter()



  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const getuserdata = async () => {
    document.title = `${session.user.name}'s Dashboard : Tip me a treat`
    let name = session.user.name
    let u = await getuser(name)
    setform({ ...form, title: u[0]?.title || '', profilepic: u[0]?.profilepic || '', coverpic: u[0]?.coverpic || '', razorpayid: u[0]?.razorpayid || '', razorpaysecret: u[0]?.razorpaysecret || '' })
  }

  useEffect(() => {
    if (session) {
      getuserdata()
    }
  }, [session])


  const handlesubmit = async () => {

    let res = await updateuserdata(form, session.user.name)
    if (res.success) {
      toast('Your profile is updated ✅', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    else {
      alert(res.error)
    }
    setform({ title: "", razorpayid: "", razorpaysecret: "", profilepic: "", coverpic: "" })
  }


  useEffect(() => {
    if (!session) {
      router.push("/");
    }
    else {
      router.push("/dashboard");
    }

  }, [session, router]);

  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='min-h-[85vh] bg-slate-950 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]' >
        <div className='w-[60%] mx-auto text-3xl font-bold text-center pt-10 pb-8 max-lg:w-[85%] max-sm:w-[90%] max-sm:text-2xl'>Let&apos;s begin with setting up your profile</div>
        <form className='w-[35%] mx-auto flex flex-col gap-5 max-lg:w-[70%] max-sm:[95%]' action={handlesubmit}>

          <div className='flex flex-col gap-1 max-sm:w-full'>
            <label className='self-start' htmlFor="title">Your Title</label>
            <input onChange={handlechange} suppressHydrationWarning={true} value={form.title} className='rounded-xl bg-slate-300 text-black pl-2 py-[1px]' type="text" name="title" id="title" />
          </div>
          <div className='flex flex-col gap-1 max-sm:w-full'>
            <label className='self-start' htmlFor="profilepic">Profile Url</label>
            <input onChange={handlechange} suppressHydrationWarning={true} className='rounded-xl bg-slate-300 text-black pl-2 py-[1px]' value={form.profilepic} type="text" name="profilepic" id="profilepic" />
          </div>
          <div className='flex flex-col gap-1 max-sm:w-full'>
            <label className='self-start' htmlFor="coverpic">Banner Url</label>
            <input onChange={handlechange} suppressHydrationWarning={true} className='rounded-xl bg-slate-300 text-black pl-2 py-[1px]' value={form.coverpic} type="text" name="coverpic" id="coverpic" />
          </div>
          <div className='flex flex-col gap-1 max-sm:w-full'>
            <label className='self-start' htmlFor="Razorpay">Razorpay Id</label>
            <input onChange={handlechange} suppressHydrationWarning={true} value={form.razorpayid} className='rounded-xl bg-slate-300 text-black pl-2 py-[1px]' type="password" name="razorpayid" id="razorpayid" />
          </div>
          <div className='flex flex-col gap-1 max-sm:w-full'>
            <label className='self-start' htmlFor="Razorpay">RazorpaySeret</label>
            <input onChange={handlechange} suppressHydrationWarning={true} value={form.razorpaysecret} className='rounded-xl bg-slate-300 text-black pl-2 py-[1px]' type="password" name="razorpaysecret" id="razorpaysecret" />
          </div>
          <div className='mx-auto'>
            <button suppressHydrationWarning={true} className="mt-4 relative cursor-pointer inline-flex items-center justify-center p-0.5 mb-7 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br disabled:from-gray-500 disabled:bg-gray-700 from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" disabled={form.title.length < 4 || form.profilepic.length < 4 || form.coverpic.length < 4 || form.razorpayid.length < 4 || form.razorpaysecret.length < 4 || form.title.length > 50}>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
              </span>
            </button>
          </div>
        </form>

      </div>
    </>
  )
}

export default Dashboard
