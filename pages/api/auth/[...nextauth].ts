import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth(
  {
    pages:{
      signIn: '/login'
    },
    providers: [
      GoogleProvider({
        clientId: String(process.env.GOOGLE_ID),
        clientSecret: String(process.env.GOOGLE_SECRET),
      }),
    ],
    callbacks:{
      session({ session, token, user }) {
        return session // The return type will match the one returned in `useSession()`
      },
    }
  }
);
