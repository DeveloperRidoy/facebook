import { getSession } from "next-auth/client";

const Authentication = async (req, cb) => {

  const session = await getSession({ req });

   if (!session) {
     return { redirect: { destination: "/login-or-signup", permanent: false } };
   } 

  if (cb) return cb();
  
  return { props: {session} };
}

export default Authentication;
