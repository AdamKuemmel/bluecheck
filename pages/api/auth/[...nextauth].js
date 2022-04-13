import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  //add custom keys to the session user object username/uid
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name;

      //token.sub is the google uid, store that bad boy in your session for later use
      session.user.uid = token.sub;
      return session;
    },
  },
});
