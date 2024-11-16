import mongoose from 'mongoose';
import NextAuth from 'next-auth'
import User from '@/models/User';
import Payment from '@/models/Payment';
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import connectDB from '@/db/connectDB';
const authoptions = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // // OAuth authentication providers...
        // AppleProvider({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: process.env.APPLE_SECRET
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET
        // }),
        // // Passwordless / email sign in
        // EmailProvider({
        //     server: process.env.MAIL_SERVER,
        //     from: 'NextAuth.js <no-reply@example.com>'
        // }),

    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            let usermail = user.email
            let username = user.name
            if (account.provider == "github") {
                await connectDB()
                const currentuser = await User.findOne({ email: usermail })

                if (!currentuser) {
                    let newuser = new User({
                        username: username,
                        email: usermail,
                        profilepic : '',
                        title : '',
                        coverpic : '', 
                        razorpayid : '', 
                        razorpaysecret : ''
                    })
                    await newuser.save()
                }
                return true
            }

        }
    }
})

export { authoptions as GET, authoptions as POST }