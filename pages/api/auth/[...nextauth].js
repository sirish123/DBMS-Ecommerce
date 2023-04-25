import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserById } from "@/util/UserController";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SESSIONSECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt(jwtProps) {
      if (jwtProps.user) jwtProps.token.user = jwtProps.user;

      return jwtProps.token;
    },
    session(sessionProps) {
      if (sessionProps.token.user)
        sessionProps.session.user = sessionProps.token.user;

      return sessionProps.session;
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email_address: {
          label: "Email Address",
          type: "email",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
        usertype: {
          label: "User Type",
          type: "text",
          placeholder: "Buyer/Seller/Advertisor",
        },
      },
      async authorize(credentials, req) {
        const { email_address, password, usertype } = credentials;

        try {
          const user = await getUserById({
            email: email_address,
            type: usertype,
          });
          if (user) {
            console.log(user);
            if (user[0].password === password) {
              return { email_address, usertype };
            } else {
              return "Invalid password";
            }
          } else {
            return "User not found";
          }
        } catch (err) {
          console.log(err);
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
