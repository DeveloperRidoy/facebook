const QuickLogin = require("../../../server/mongoDb/models/QuickLogin");
const jwt = require('jsonwebtoken');

// function to create logins
  const createQuickLogins = async (user, rememberPassword) => {
    const quickLogins = await QuickLogin.create({
      logins: [
        { user, rememberPassword: rememberPassword || false },
      ],
    });
    const populatedQuickLogins = await QuickLogin.findById(
      quickLogins._id
    )
    return populatedQuickLogins;
  };
    
const addOrUpdateQuickLogins = async (req, user, rememberPassword) => {
   // check if there is already a quick-logins-token
   const quickLoginsToken = req.signedCookies["quick-logins-token"];
   if (quickLoginsToken) {
     // verify token
     const validToken = jwt.verify(quickLoginsToken, process.env.JWT_SECRET);

     // update quick-logins if validToken
     if (validToken) {
       const quickLogins = await QuickLogin.findById(validToken.id);
       if (quickLogins) {
         const savedUserIndex = quickLogins.logins.findIndex(login => String(login.user?._id) === String(user._id)); 
        //  update existing quickLogin or add new quickLogin
         if (savedUserIndex !== -1) {
           if (quickLogins.logins[savedUserIndex].rememberPassword === rememberPassword) {
             return quickLogins;
           } else {
             quickLogins.logins[savedUserIndex].rememberPassword = rememberPassword || false;
             const updatedQuickLogins = await quickLogins.save()
             return updatedQuickLogins;;
           }
             
         } else {
            quickLogins.logins.push({
              user,
              rememberPassword: rememberPassword || false,
            });
           await quickLogins.save();
           return quickLogins;
         }        
       } else {
         return await createQuickLogins(user, rememberPassword);
       }
     } else {
       return await createQuickLogins(user, rememberPassword);
     }
   } else {
    return await createQuickLogins(user, rememberPassword);
   }
}

module.exports = addOrUpdateQuickLogins;