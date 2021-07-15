const jwt = require('jsonwebtoken');
 
const jwtCookieToken = (data, cookieName, req, res) => {

  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
   
  // attach token with response cookies
  res.cookie(cookieName, token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME_IN_DAYS * 24 * 60 * 60 * 1000
    ),
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    httpOnly: true,
    signed: true 
  });
  return token;
};
module.exports = jwtCookieToken;