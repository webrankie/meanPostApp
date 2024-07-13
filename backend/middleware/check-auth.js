const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secret_as_should_be_longer_AS42");
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
  } catch (err) {
    return res.status(401).send({message: 'You are not authenticated!'});
  }
}
