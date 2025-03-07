"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] min-h-screen">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex justify-evenly py-14 items-center max-lg:flex-col max-lg:gap-10 max-sm:w-[95%]">
            <motion.div whileHover={{ scale: 1.1 }} className="w-80 cursor-pointer rounded-lg h-auto shadow-lg">
              <Image width={390} height={250} src="/Image-1.jpeg" alt="" />
            </motion.div>
            <div className="flex flex-col text-white gap-5 items-center">
              <div className="flex gap-4 items-center justify-center text-5xl font-bold text-center max-sm:text-3xl">
                <motion.div whileHover={{ scale: 1.1 }} className='w-16 rounded-full mt-1 cursor-pointer shadow-lg'>
                  <Image width={60} height={75} src="/creatorrise.jpg" alt="logo-image" />
                </motion.div>
                <p>Tip me a treat</p>
              </div>
              <div className="text-4xl font-semibold w-[500px] text-center max-sm:text-2xl text-wrap max-md:w-[90%]">Welcome to the one platform to get funded by your fans and followers</div>
              <div className="flex gap-4 mt-5 justify-center">
                <Link href={'/login'}>
                  <motion.button whileHover={{ scale: 1.1 }} type="button" className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-lg">
                    Start Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="bg-gray-600 h-[1px]"></div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex items-center justify-evenly my-14 max-lg:flex-col max-lg:gap-14">
            <div className="flex w-[25%] text-center text-white flex-col items-center justify-center gap-3 max-lg:w-[90%]">
              <motion.div whileHover={{ scale: 1.1 }} className="bg-blue-950 rounded-full p-3 mb-4 cursor-pointer shadow-lg">
                <Image className="w-24" src="/Gif-1.gif" width={220} height={220} alt="" />
              </motion.div>
              <h2 className="text-xl font-bold">Empower Your Creative Journey</h2>
              <p className="text-base">Turn your passion into a sustainable career. Let your fans support your work with ease through secure and flexible contributions.</p>
            </div>

            <div className="flex w-[25%] text-center text-white flex-col items-center justify-center gap-3 max-lg:w-[90%]">
              <motion.div whileHover={{ scale: 1.1 }} className="bg-blue-950 rounded-full p-3 mb-4 cursor-pointer shadow-lg">
                <Image className="w-24" src="/Gif-2.gif" width={220} height={220} alt="" />
              </motion.div>
              <h2 className="text-xl font-bold"> Connect with Your Community</h2>
              <p className="text-base">Build deeper relationships with your followers. Engage them by sharing exclusive content and letting them contribute to your creative vision.</p>
            </div>

            <div className="flex w-[25%] text-center text-white flex-col items-center justify-center gap-3 max-lg:w-[90%]">
              <motion.div whileHover={{ scale: 1.1 }} className="bg-blue-950 rounded-full p-3 mb-4 cursor-pointer shadow-lg">
                <Image className="w-24" src="/Gif-3.gif" width={220} height={220} alt="" />
              </motion.div>
              <h2 className="text-xl font-bold">Raise Funds, Fuel Your Dreams</h2>
              <p className="text-base">Whether you are launching a new project or need ongoing support, our platform helps you raise funds directly from your loyal supporters.</p>
            </div>
          </motion.div>

          <div className="bg-gray-600 h-[1px]"></div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex justify-evenly items-center py-14 max-lg:flex-col-reverse max-lg:gap-10">
            <div className="flex flex-col text-white gap-5">
              <div className="text-5xl font-bold"></div>
              <div className="text-4xl font-bold w-[500px] text-center max-sm:w-[95%] max-md:text-2xl">Start Getting funded by your followers now</div>
              <div className="flex gap-4 mt-5 justify-center">
                <Link href={'/login'}>
                  <motion.button whileHover={{ scale: 1.1 }} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Get Started Now
                    </span>
                  </motion.button>
                </Link>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.1 }} className="w-80 cursor-pointer rounded-lg shadow-lg">
              <Image width={390} height={250} src="/Image-2.jpeg" alt="" />
            </motion.div>
          </motion.div>

          <div className="bg-gray-600 h-[1px]"></div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col justify-center items-center space-y-10 py-14 mx-auto max-lg:w-[95%]">
            <div className="text-white text-4xl font-bold">More About us</div>
            <motion.video whileHover={{ scale: 1.05 }} className="rounded-3xl shadow-lg" src="about-video.mp4" muted loop autoPlay></motion.video>
          </motion.div>
        </div>
      </div>
    </>
  );
}
