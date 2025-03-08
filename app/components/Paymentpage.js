"use client"

import Script from 'next/script'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { start, getpayment, getuser } from '@/actions/useractions';
import { useSearchParams } from 'next/navigation';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useRouter } from 'next/navigation';
const Paymentpage = ({ params }) => {

    const { data: session } = useSession()
    const [form, setForm] = useState({ name: '', message: '', amount: '' })
    const [currentuser, setCurrentuser] = useState([])
    const credentials = useRef()
    const [loader, setloader] = useState(false)
    const [payments, setpayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleadd = async (amount) => {
        let addition = Number(form.amount) + amount
        setForm({ ...form, amount: addition })
    }

    useEffect(() => {
        if (searchParams.get("paymentdone") == 'true') {
            toast.success('Payment Successful', {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        router.push(`/${params.replace(' ', '-')}`)
    }, [])


    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        let userdata = await getuser(params)
        let paymentsdata = await getpayment(params)
        credentials.current = userdata[0]
        setpayments(paymentsdata)
        setCurrentuser(userdata)
        return payments
    }

    useEffect(() => {
        setloader(true)
        if (currentuser[0]) {
            console.log(currentuser[0].profilepic);
        }
    }, [currentuser])

    const pay = async () => {

        if (!credentials.current.razorpayid || !credentials.current.razorpaysecret) {
            console.log(credentials.current.razorpayid, credentials.current.razorpaysecret);
            toast.error('User has not set up payment credentials yet',
                {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                }
            )
            setForm({ name: '', message: '', amount: '' })
            return
        }

        let payment = await start(session.user?.name, form)

        let order_id = payment?.id

        var options = {
            "key_id": credentials.current.razorpayid,
            "amount": `${form.amount}00`,
            "currency": "INR",
            "name": `${form.name}`,
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order_id,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new window.Razorpay(options)
        rzp1.open();
    }
    return (
        <>
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className='min-h-[85vh] overflow-x-hidden bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
                <div className='relative'>
                    <div className='flex justify-center rounded-xl'>
                        {currentuser && currentuser[0]?.coverpic ? (
                            <Image
                                className='w-screen object-cover h-[40vh] max-lg:h-[20vh]'
                                src={currentuser[0].coverpic}
                                width={2000}
                                height={300}
                                alt='Banner picture'
                                unoptimized
                            />
                        ) : !loader ? (
                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                <Skeleton height={300} width={2000} className='w-screen object-cover h-[48vh] max-sm:h-[20vh]' />
                            </SkeletonTheme>
                        ) :
                            <Image
                                className='w-screen object-cover h-[40vh] max-lg:h-[20vh]'
                                src={'samplebanner.jpg'}
                                width={2000}
                                height={300}
                                alt='Banner picture'
                                unoptimized
                            />
                        }
                    </div>

                    <div className='flex justify-center h-0 rounded-xl'>
                        {currentuser && currentuser[0]?.profilepic && loader ? (
                            <Image
                                className='w-28 absolute h-28 top-[32vh] border border-white rounded-full object-cover max-lg:top-[15vh] cursor-pointer scale-1 max-sm:h-20 max-sm:w-20'
                                src={currentuser[0].profilepic}
                                width={2000}
                                height={300}
                                alt='Profile picture'
                                unoptimized
                            />
                        ) : !loader ? (
                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                <Skeleton circle={true} height={112} width={112} className='w-28 absolute h-28 -top-14 border border-white rounded-lg object-fill max-lg:-top-14 cursor-pointer scale-1 max-sm:h-20 max-sm:w-20' />
                            </SkeletonTheme>
                        ) :
                            <Image
                                className='w-28 absolute h-28 top-60 border border-white rounded-full object-fill max-lg:top-64 cursor-pointer scale-1 max-sm:h-20 max-sm:w-20'
                                src={'sampleuser.png'}
                                width={2000}
                                height={300}
                                alt='Profile picture'
                                unoptimized
                            />
                        }
                    </div>
                </div>

                <div className='text-2xl text-center mt-16 font-semibold'>
                    {currentuser && currentuser[0]?.username ? (
                        currentuser[0].username
                    ) : (
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            <Skeleton width={200} height={30} />
                        </SkeletonTheme>
                    )}
                </div>

                <div className='text-center text-base mt-1 font-normal'>
                    {currentuser && currentuser[0]?.title ? (
                        currentuser[0].title
                    ) : !loader ? (
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            <Skeleton width={300} height={20} />
                        </SkeletonTheme>
                    ) :
                        <p> Here Comes your title</p>
                    }

                </div>
                <div className='text-center text-sm mt-1'>
                    {payments.length > 0 ? (
                        `₹${payments.reduce((a, b) => a + b.amount, 0)} Raised • ${payments.length} Payments received yet`
                    ) : (
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            <Skeleton width={300} height={20} />
                        </SkeletonTheme>
                    )}
                </div>
                <div className='text-sm font-thin mt-1 text-center'>
                    {currentuser && currentuser[0]?.username ? (
                        `Tip ${currentuser[0].username} a Treat`
                    ) : (
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            <Skeleton width={200} height={20} />
                        </SkeletonTheme>
                    )}
                </div>
                <div className="main w-[80%] mx-auto flex gap-[2%] py-20 text-slate-400 max-lg:flex-col max-lg:gap-10">
                    <div className="supporters bg-gray-900 p-10 rounded-xl w-[48%] flex flex-col gap-5 items-center max-lg:w-[95%] max-lg:px-5">
                        <h2 className='text-3xl font-bold max-sm:text-xl'>Top Contributers</h2>
                        <ul className='flex flex-col gap-5 max-lg:p-2'>

                            {payments.length > 0 ? (
                                payments.slice(0, 5).map((item, id) =>
                                    <li key={id} className='text-semibold text-wrap flex gap-5 items-center max-sm:text-sm'>
                                        <Image className='w-8 cursor-pointer max-sm:w-6' src="/user.gif" alt="user" width={200} height={200} />
                                        <div><span className='font-bold'>{item.name}</span> just contributed <span className='font-bold'>₹{item.amount}</span><b>. {item.message}</b></div>
                                    </li>
                                )
                            ) : (
                                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                    {[...Array(5)].map((_, id) => (
                                        <li key={id} className='text-semibold text-wrap flex gap-5 items-center max-sm:text-sm'>
                                            <Skeleton circle={true} height={32} width={32} />
                                            <div><Skeleton width={200} height={20} /></div>
                                        </li>
                                    ))}
                                </SkeletonTheme>
                            )}
                            {payments.length == 0 && loader && <li className='text-bold text-xl text-wrap max-sm:text-lg'> No Payments Yet</li>}
                        </ul>
                    </div>
                    <div className="payment bg-gray-900 rounded-xl w-[48%] flex flex-col justify-center gap-5 py-10 items-center max-lg:w-[95%]">
                        <h2 className='text-3xl font-semibold'>Make Payment</h2>
                        <div className='flex flex-col items-center gap-5'>
                            <div className='flex gap-5 max-lg:flex-col'>
                                <input onChange={handlechange} value={form.name} suppressHydrationWarning={true} className='font-semibold text-center bg-gray-800 rounded-xl pl-2 h-10 w-44 max-lg:w-64' placeholder='Enter name' type="text" name="name" id="name" />
                                <input onChange={handlechange} value={form.message} suppressHydrationWarning={true} className='font-semibold text-center bg-gray-800 rounded-xl pl-2 h-10 w-44 max-lg:w-64' placeholder='Enter message' type="text" name="message" id="message" />
                            </div>
                            <input onChange={handlechange} value={form.amount} suppressHydrationWarning={true} className='font-bold text-center bg-gray-800 rounded-xl pl-2 h-10 w-64' placeholder='Enter amount' type="number" name="amount" id="payment" />
                            <button onClick={() => { pay() }} suppressHydrationWarning={true} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 disabled:from-red-600 disabled:bg-red-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" disabled={form.name?.length < 3 || form.message?.length < 5 || form.amount?.length < 1 || form.amount > 10000000}>
                                <span className="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Make Payment
                                </span>
                            </button>

                        </div>
                        <div className="amount flex gap-3">
                            <button type="button" onClick={() => handleadd(10)} name='amount' value={10} suppressHydrationWarning={true} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">₹10</button>
                            <button type="button" onClick={() => handleadd(20)} name='amount' value={20} suppressHydrationWarning={true} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">₹20</button>
                            <button type="button" onClick={() => handleadd(30)} name='amount' value={30} suppressHydrationWarning={true} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Paymentpage