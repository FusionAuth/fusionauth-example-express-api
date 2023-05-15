const jose = require('jose')
const createError = require('http-errors');

const jwksClient = jose.createRemoteJWKSet(new URL(process.env.FUSIONAUTH_SERVER_URL + '/.well-known/jwks.json'));

const authentication = async (req, res, next) => {
    const access_token = req.cookies['app.at'];

    if (!access_token) {
        next(createError(401, 'No access token found'));
    } else {
        try {
            await jose.jwtVerify(access_token, jwksClient, {
                issuer: process.env.FUSIONAUTH_ISSUER,
                audience: process.env.FUSIONAUTH_CLIENT_ID,
            })
            next();
        } catch (e) {
            console.error(e);
            next(createError(401, 'Access token invalid'));
        }
    }
}

module.exports = authentication;
