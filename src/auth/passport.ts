import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";
import { StrategyOptions } from "passport-jwt";

const config: StrategyOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "passwordless",
};

let ok = true;

passport.use(
  new JWTStrategy(config, function (payload, done) {
    console.log("payload => ", payload);
    // TODO: search in database??
    if (ok) {
      return done(null, payload);
    } else {
      return done(false);
    }
  })
);

export default passport;
