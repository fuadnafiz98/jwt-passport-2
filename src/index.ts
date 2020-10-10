import express, {NextFunction, Response, Request} from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import * as bodyParser from "body-parser";
import { Strategy  as JWTStrategy } from "passport-jwt";
import { ExtractJwt  as ExtractJWT } from "passport-jwt";
import { StrategyOptions } from "passport-jwt";

const ok = true;

const config: StrategyOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "passwordless"
};

passport.use(new JWTStrategy(config, function(payload, done) {
  console.log("payload => ", payload);
  if(ok) {
    return done(null, {
      username: "fuad",
      email: "fuad@mail.com"
    });
  } else {
    return done(false);
  }
}));

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

app.post("/signin", (req, res) => {
  const { username, email } = req.body;  
  const token = jwt.sign({ username, email }, "passwordless", { expiresIn: 12000 });
  res.json({
    success: true,
    token: token
  });
});

const handleAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log(`err => ${err}`);
    console.log(`user => ${JSON.stringify(user)}`);
    console.log(`info => ${info}`);
    req.user = user;
    next();
  })(req, res, next);
};

app.get("/vip", handleAuth, (req, res) => {
  return res.json(req.user);
});

app.get("/", (req, res) => {
  res.json({ get: "Ok"});
});

app.listen(8080, () => {
  console.log(`server running on port 8080`);
});
