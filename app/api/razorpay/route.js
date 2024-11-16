import { NextResponse } from 'next/server'
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils'
import Payment from '@/models/Payment'
import User from '@/models/User'
import connectDB from '@/db/connectDB'

export const POST = async (req) => {
  await connectDB()
  let body = await req.formData()
  body = Object.fromEntries(body)
  let payment = await Payment.findOne({ oid: body.razorpay_order_id })
  if (!payment) {
    return NextResponse.json({ success: false, message: "OrderId not found" })
  }
  let userdata = await User.findOne({username : payment.to_user})
  let xx = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, userdata.razorpaysecret)
  if (xx) {
    let updatedpayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: "true" }, { new: "true" })
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedpayment.to_user.replace(' ', '-')}?paymentdone=true`)
  }
  else {
    return NextResponse.json({ success : false, message: "Payment verification failed" })
  }
}