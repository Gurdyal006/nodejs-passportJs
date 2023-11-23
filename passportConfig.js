const LocalStrategy = require("passport-local").Strategy;
const {User} = require("./userSchema.js");

exports.initializePassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        console.log(user);

        if (!user) return done(null, false);

        if (user.password !== password) return done(null, false);
console.log('3333');
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    console.log('4444');
    done(null, user.id); /// user ki id save krta hai or user ki id bnata hai
  });

  passport.deserializeUser(async (id, done) => {
    console.log('555');
    //// findby id krke user find krta hai
    try {
        console.log('6666');
      const user = await User.findById(id);

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
