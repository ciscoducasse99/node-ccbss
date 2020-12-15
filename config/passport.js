const OAuth2Strategy = require("passport-oauth2").Strategy;

module.exports = function (passport) {
  passport.use(
    new OAuth2Strategy(
      {
        authorizationURL: "https://oauth.ccbchurch.com/oauth/authorize",
        tokenURL: "https://api.ccbchurch.com/oauth/token",
        clientID: EXAMPLE_CLIENT_ID,
        clientSecret: EXAMPLE_CLIENT_SECRET,
        callbackURL: "auth/ccb/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ exampleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );
};
