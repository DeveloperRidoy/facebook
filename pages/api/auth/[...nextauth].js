import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({  
  providers: [ 
    Providers.Credentials({
      name: "email and password",
      credentials: {
        emailOrPhone: { label: 'emailOrPhone', type: 'text', placeholder: "Email or Phone"},
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const { emailOrPhone, password } = credentials;
        console.log(credentials);
        const user = { name: 'ridoy', age: 21 };
        if (
          emailOrPhone === "freelancerridoy247@gmail.com" &&
          password === "12345678"
        )
          return user;
        return null;
      }
    }),
  ],
  debug: true,
  secret: process.env.JWT_SIGN_SECRET,
  database: process.env.DB_URL,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_KEY_SECRET,
    encryption: true,
  },
  pages: {
    signIn: '/login-or-signup'
  },

});
