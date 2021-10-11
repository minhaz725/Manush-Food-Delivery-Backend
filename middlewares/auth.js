const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {

    
    //console.log('Cookies: ', req.signedCookies)

  var token = await req.cookies.jwt
  
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; 
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}
