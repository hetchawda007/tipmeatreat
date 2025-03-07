import React from 'react'
import Paymentpage from '../components/Paymentpage';
import { notFound } from 'next/navigation';
import { getuser } from '@/actions/useractions';


const Username = async ({ params }) => {

    const { username } = await params
    let name = username?.replace('-', ' ')
    const userdata = await getuser(name)
    if (userdata.length < 1) {
        return notFound()
    }
    return (
        <>
            <Paymentpage params={name} />
        </>
    );
};



export default Username;