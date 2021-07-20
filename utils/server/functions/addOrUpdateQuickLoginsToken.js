const jwt = require('jsonwebtoken');
const AppError = require('../../../server/api/v1/middlewares/AppError');
const User = require('../../../server/mongoDb/models/User');
const jwtCookieToken = require('./jwtCookieToken');
const { QUICK_LOGINS_TOKEN } = require('../../../utils/server/variables');

const addOrUpdateQuickLoginsToken = (req, res, next, user, rememberPassword = false) => {
    return new Promise((resolve, reject) => {
        try {
          // function to create token
          const createToken = async (data) => {
            const responseData = [];
            const tokenData = [];

            //   populate data
            if (typeof data === "object" && data.length > 0) {
              const users = await User.find({
                $or: data.map((login) => ({ _id: login.user })),
              }).select("firstName surName fullName email photo");

              users.forEach((user) => {
                const loginIndex = data.findIndex(
                  (login) => String(login.user) === String(user?._id)
                );
                if (loginIndex === -1) return;

                // populate responseData
                responseData.push({
                  user,
                  rememberPassword: data[loginIndex].rememberPassword || false,
                });

                // populate tokneData
                tokenData.push({
                  user: user._id,
                  rememberPassword: data[loginIndex].rememberPassword || false
                })
              });
            }

            const quickLoginsToken = jwtCookieToken(
              { data: JSON.stringify(tokenData) },
              QUICK_LOGINS_TOKEN,
              req,
              res
            );

            resolve({ quickLogins: responseData, quickLoginsToken });
          };
            
          // check if token exists
          const token = req.signedCookies[QUICK_LOGINS_TOKEN];
          if (!token) {
            // return empty token if no previous tokn or no user
            if (!user) return createToken([]);
            // return new token with login data if there is user and no previous token
            return createToken([{ user: user._id, rememberPassword }]);
          }

          // check if token is valid
          const validToken = jwt.verify(token, process.env.JWT_SECRET);
          if (!validToken) return next(new AppError(400, "not authorized"));

          // parse token data
            const tokenData = JSON.parse(validToken.data);
            
          //   return previous token if no user
            if (validToken && !user) return createToken(tokenData);

          // check if login already exists with same user
          const loginIndex = tokenData.findIndex(
            (login) => String(login.user) === String(user._id)
          );

          // update user login if exists
          if (loginIndex !== -1) {
            tokenData[loginIndex].rememberPassword = rememberPassword;
            return createToken(tokenData);
          }

          // add new user login
          tokenData.push({ user: user._id, rememberPassword });
          return createToken(tokenData);
        } catch (error) {
            let data = []
            if (user) {
                data = [{ user: user._id, rememberPassword }];
            };
             const jsonData = JSON.stringify(data);
             const quickLoginsToken = jwtCookieToken(
               {data:jsonData},
               QUICK_LOGINS_TOKEN,
               req,
               res
             );
             resolve({ quickLogins: user, quickLoginsToken });
      }
    });
}

module.exports = addOrUpdateQuickLoginsToken;