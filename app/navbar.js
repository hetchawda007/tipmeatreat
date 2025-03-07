import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    return (
        <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <motion.div whileHover={{ scale: 1.1 }} className="text-white text-2xl font-bold cursor-pointer">
                    <Link href="/">Tip me a treat</Link>
                </motion.div>
                <div className="flex gap-4">
                    <motion.div whileHover={{ scale: 1.1 }} className="text-white text-lg cursor-pointer">
                        <Link href="/about">About</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} className="text-white text-lg cursor-pointer">
                        <Link href="/services">Services</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} className="text-white text-lg cursor-pointer">
                        <Link href="/contact">Contact</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} className="text-white text-lg cursor-pointer">
                        <Link href="/login">Login</Link>
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
}
