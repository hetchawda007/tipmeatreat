import NextAuth from 'next-auth'
import User from '@/models/User';
import GitHubProvider from "next-auth/providers/github";
import connectDB from '@/db/connectDB';
const authoptions = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            state: true
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            let usermail = user.email
            let accessToken = account.access_token
            if (!accessToken) {
                throw new Error('No access token provided')
            }
            console.log(process.env.GITHUB_ID, process.env.GITHUB_SECRET, process.env.NEXTAUTH_SECRET);
            let username = user.name
            if (account.provider == "github") {
                await connectDB()
                const currentuser = await User.findOne({ email: usermail })

                if (!currentuser) {
                    let newuser = new User({
                        username: username,
                        email: usermail,
                        profilepic: '',
                        title: '',
                        coverpic: '',
                        razorpayid: '',
                        razorpaysecret: ''
                    })
                    await newuser.save()
                }
                return true
            }

        }
    }
})

export { authoptions as GET, authoptions as POST }