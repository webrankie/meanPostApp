const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, "secret_as_should_be_longer_AS42");
    next();
  } catch (err) {
    return res.status(401).send({message: 'Unauthorized'});
  }
}
