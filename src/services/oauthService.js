const OAuth2Server = require('oauth2-server');
const authModel = require('../models/auth.model');
const errorHandler = require('../models/errorModel');

var oauth = new OAuth2Server({
  model: require('../models/auth.model'),
  accessTokenLifetime: 4 * 60 * 60,
  allowBearerTokensInQueryString: true
});

export async function createToken(req, res) {
  req.headers["content-type"] = "application/x-www-form-urlencoded";
  req.body.client_id = "application";
  req.body.client_secret = "secret";
  req.body.grant_type = "password";
  var request = new OAuth2Server.Request(req);
  var response = new OAuth2Server.Response(res);

  try {
    const token = await oauth.token(request, response);
    if (!validateToken(token))
      throw new Error();

    res.json({
      accessToken: token.accessToken,
      expiresIn: token.accessTokenExpiresAt
    });
  }
  catch (err) {
    var message = errorHandler.getMessage('INTERNAL_SERVER_ERR');
    console.log(err);
    res.status(500).json(message);
  }
}


export function validateToken(res) {
  if (res != null && res.accessToken != null && res.accessTokenExpiresAt) {
    return true;
  }
  return false;
}

export async function checkAuthentication(req, res, next) {

  try {
    if (req != null && req.headers != null && req.headers["authorization"] != null) {
      var authResult = await oauth.authenticate(new OAuth2Server.Request(req), new OAuth2Server.Response(res));
      req.body.user_id = authResult.userId;
      next();
    } else {
      var message = errorHandler.getMessage('ERR_UNAUTHORIZED');
      res.status(400).json(message);
    }
  } catch (err) {
    var message = errorHandler.getMessage('ERR_AUTH_TOKEN_EXPIRED');
    res.status(401).json(message);
  }

}