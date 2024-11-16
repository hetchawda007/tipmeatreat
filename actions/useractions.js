"use server"

import connectDB from "@/db/connectDB"
import Payment from "@/models/Payment"
import Razorpay from "razorpay"
import User from "@/models/User"


export const start = async (name, form) => {
    await connectDB()
    const userdata = await getuser(name)

    var instance = new Razorpay({ key_id: userdata[0]?.razorpayid, key_secret: userdata[0]?.razorpaysecret })

    const options = {
        amount: form.amount * 100,
        currency: "INR",
    };

    const x = await instance.orders.create(options);

    await Payment.create({
        name: form.name,
        to_user: name,
        oid: x.id,
        message: form.message,
        amount: form.amount
    });

    return x
}

export const getpayment = async (params) => {
    await connectDB()
    let payments = await Payment.find({ to_user: params, done: true }).sort({ amount: -1 }).lean()
    payments = JSON.parse(JSON.stringify(payments));
    return payments
}

export const getuser = async (params) => {

    await connectDB()
    let u = await User.find({ username: params })
    u = JSON.parse(JSON.stringify(u));
    return u
}

export const updateuserdata = async (udata, username) => {
    await connectDB()
    let u = await User.findOneAndUpdate({ username: username })
    if (u) {
        await User.updateMany({ username: username }, { $set: { title: udata.title, username: udata.username, profilepic: udata.profilepic, coverpic: udata.coverpic, razorpayid: udata.razorpayid, razorpaysecret: udata.razorpaysecret } })
        return ({ success: true })
    }
    else {
        return ({ error: 'User not found' })
    }
}