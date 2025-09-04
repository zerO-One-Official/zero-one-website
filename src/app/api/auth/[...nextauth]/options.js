import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/utils/dbConnect";

export const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await connect();
        const { emailOrRoll, password } = credentials;

        let user = null;

        if (isNaN(parseInt(emailOrRoll))) {
          user = await User.findOne({ email: emailOrRoll }).select([
            "password",
            "email",
            "username",
            "firstName",
            "roll",
            "role",
            "active",
            "profilePic",
          ]);
        } else {
          user = await User.findOne({ roll: emailOrRoll }).select([
            "password",
            "username",
            "email",
            "firstName",
            "roll",
            "role",
            "active",
            "profilePic",
          ]);
        }

        if (!user) {
          throw new Error("You are not a member.");
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
          throw new Error("incorrect Credentials");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token._id = user._id;
        token.name = user.firstName;
        token.roll = user.roll;
        token.username = user.username;
        token.role = user.role;
        token.profilePic = user.profilePic;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      return { ...session, user: { ...token } };
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
