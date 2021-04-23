import passport, { magicLogin } from "../auth/passport";
 passport.authenticate("magiclogin", { session: false }, (err, user) => {
  console.log(user);
});
