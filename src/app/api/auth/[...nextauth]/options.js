
import User from "@/models/Users";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const options = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {

                const { emailOrRoll, password } = credentials;

                let user = null;

                if (isNaN(parseInt(emailOrRoll))) {
                    user = await User.findOne({ email: emailOrRoll }).select(['password', 'email', 'firstName', 'roll', 'role', 'active', 'profilePic',])
                }
                else {
                    user = await User.findOne({ roll: emailOrRoll }).select(['password', 'email', 'firstName', 'roll', 'role', 'active', 'profilePic',])
                }


                if (!user) {
                    throw new Error('You are not a member.');
                }
                if (!user.active) throw new Error('Your Account is not Active.');

                const passwordMatched = await bcrypt.compare(password, user.password);

                if (!passwordMatched) {
                    throw new Error('incorrect Credentials');
                }

                user.activeSessions = 1;
                await user.save();

                return user;
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.name = user.firstName;
                token.roll = user.roll;
                token.role = user.role;
                token.profilePic = user.profilePic;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            return { ...session, user: { ...token } }
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt"
    },
}