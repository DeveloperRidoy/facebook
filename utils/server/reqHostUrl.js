const reqHostUrl = (req) => { 
  const protocol = req.headers["x-forwarded-proto"] || "http"; // Check for HTTPS behind a proxy
  const hostname = req.headers.host;

  // Construct the full URL
  const fullURL = `${protocol}://${hostname}`;

  return fullURL;
}

export default reqHostUrl;