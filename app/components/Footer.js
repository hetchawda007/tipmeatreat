import React from 'react'

const Footer = () => {
    const currentyear = new Date().getFullYear()
    return (
        <>
            <div className='bg-slate-950 text-gray-400 flex items-center text-wrap text-center justify-center h-[5vh] px-32 max-md:px-[5px] max-md:h-[10vh] max-sm:text-base'>
                Copyright &copy; {currentyear} Tip me a treat - All rights reserved
            </div>
        </>
    )
}

export default Footer
