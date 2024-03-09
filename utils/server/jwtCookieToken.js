const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");

export const setCookie = (data, cookieName, req, res) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  // attach token with response cookies
  res.setHeader(
    "Set-Cookie",
    serialize(cookieName, String(token), {
      maxAge: process.env.COOKIE_MAX_AGE_IN_SECONDS || 1209600,
      sameSite: true,
      httpOnly: true,
      domain: "",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  );
  return token;
};

export const removeCookie = (cookieName, req, res) => {
  res.setHeader(
    "Set-Cookie",
    serialize(cookieName, "", {
      maxAge: -1,
      sameSite: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  );
};
