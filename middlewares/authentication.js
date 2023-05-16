const jose = require('jose')

const jwksClient = jose.createRemoteJWKSet(new URL(process.env.FUSIONAUTH_SERVER_URL + '/.well-known/jwks.json'));

const authentication = async (req, res, next) => {
    const access_token = req.cookies['app.at'];

    if (!access_token) {
        res.status(401);
        res.send({error: 'No access token found'});
    } else {
        try {
            await jose.jwtVerify(access_token, jwksClient, {
                issuer: process.env.FUSIONAUTH_ISSUER,
                audience: process.env.FUSIONAUTH_CLIENT_ID,
            })
            next();
        } catch (e) {
            if (e instanceof jose.errors.JOSEError) {
                res.status(401);
                res.send({error: e.message, code: e.code});
            } else {
                res.status(500);
                res.send({error: JSON.stringify(e)});
            }
        }
    }
}

module.exports = authentication;
