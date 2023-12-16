
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
                    user = await User.findOne({ email: emailOrRoll }).select(['password', 'firstName', 'roll', 'role'])
                }
                else {
                    user = await User.findOne({ roll: emailOrRoll }).select(['password', 'firstName', 'roll', 'role'])
                }


                if (!user) {
                    throw new Error('You are not a member.');
                }

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