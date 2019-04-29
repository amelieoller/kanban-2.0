import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import moment from 'moment';
import createWelcomeBoard from './createWelcomeBoard';

const configurePassport = db => {
  const users = db.collection('users');
  const boards = db.collection('boards');

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  passport.deserializeUser((id, cb) => {
    users.findOne({ _id: id }).then(user => {
      cb(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.ROOT_URL}/auth/google/callback`,
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, params, profile, cb) => {
        const expiryDate = moment()
          .add(params.expires_in, 's')
          .format('X');

        users.findOne({ _id: profile.id }).then(user => {
          if (user) {
            users.updateOne(
              { _id: user._id },
              {
                $set: {
                  accessToken,
                  refreshToken,
                  expiryDate
                }
              }
            );

            cb(null, user);
          } else {
            const newUser = {
              _id: profile.id,
              name: profile.displayName,
              imageUrl: profile._json.image.url,
              accessToken,
              refreshToken,
              expiryDate
            };
            users.insertOne(newUser).then(() => {
              boards
                .insertOne(createWelcomeBoard(profile.id))
                .then(() => cb(null, newUser));
            });
          }
        });
      }
    )
  );
};

export default configurePassport;
