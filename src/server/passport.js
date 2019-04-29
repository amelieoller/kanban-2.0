import passport from "passport";
import { GoogleOauthJWTStrategy as GoogleStrategy } from "passport-google-oauth-jwt";
import moment from "moment";
import createWelcomeBoard from "./createWelcomeBoard";

const configurePassport = db => {
  const users = db.collection("users");
  const boards = db.collection("boards");

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
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      },
      (accessToken, loginInfo, refreshToken, done) => {
        // const expiryDate = moment()
        //   .add(params.expires_in, "s")
        //   .format("X");
        users.findOne({ _id: loginInfo.id }).then(user => {
          if (user) {
            done(null, user);
          } else {
            const newUser = {
              _id: loginInfo.id,
              name: loginInfo.displayName,
              imageUrl: loginInfo._json.image.url,
              accessToken,
              refreshToken
            };
            users.insertOne(newUser).then(() => {
              boards
                .insertOne(createWelcomeBoard(loginInfo.id))
                .then(() => done(null, newUser));
            });
          }
        });
      }
    )
  );

  // (accessToken, loginInfo, refreshToken, done) => {
  //   console.log(done);
  // users.findOne({ _id: loginInfo.id }).then(user => {
  //   if (user) {
  //     cb(null, user);
  //     console.log(user);
  //   } else {
  //     const newUser = {
  //       _id: loginInfo.id,
  //       name: loginInfo.displayName,
  //       imageUrl: loginInfo._json.image.url,
  //       accessToken,
  //       refreshToken,
  //       expiryDate
  //     };
  //     console.log(newUser);

  // users.insertOne(newUser).then(() => {
  //   boards
  //     .insertOne(createWelcomeBoard(profile.id))
  //     .then(() => cb(null, newUser));
  // });
  // }
  // });
  // User.findOrCreate(
  //   {
  //     googleEmail: loginInfo.email
  //   },
  //   (err, user) => done(err, user)
  // );
  //     }
  //   )
  // );
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_CLIENT_ID,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET
  //     },
  //     (accessToken, loginInfo, refreshToken, done) => {
  //       console.log("AAAA", accessToken);
  //       console.log("INFO", loginInfo);
  //       console.log("Refresh", refreshToken);

  // const expiryDate = moment()
  //   .add(params.expires_in, "s")
  // 	.format("X");

  // users.findOne({ _id: profile.id }).then(user => {
  //   if (user) {
  //     cb(null, user);
  //   } else {
  //     const newUser = {
  //       _id: profile.id,
  //       name: profile.displayName,
  // 			imageUrl: profile._json.image.url,
  // 			accessToken,
  // 			refreshToken,
  // 			expiryDate
  //     };
  //     users.insertOne(newUser).then(() => {
  //       boards
  //         .insertOne(createWelcomeBoard(profile.id))
  //         .then(() => cb(null, newUser));
  //     });
  //   }
  // });
  // }
  //   )
  // );
};

// const configurePassport = db => {
//   const users = db.collection("users");
//   const boards = db.collection("boards");

//   passport.serializeUser((user, cb) => {
//     cb(null, user._id);
//   });
//   passport.deserializeUser((id, cb) => {
//     users.findOne({ _id: id }).then(user => {
//       cb(null, user);
//     });
//   });

//   const responseGoogle = (response, dispatch) => {
//     console.log(response);
//     debugger;

//     // localStorage.setItem("jwtToken", response.tokenId);

//     // dispatch({
//     //   type: "UPDATE_USER",
//     //   payload: {
//     //     accessToken: response.Zi.access_token,
//     //     expiryDate: response.Zi.expires_at,
//     //     jwt: response.tokenId
//     //   }
//     // });
//   };

//   const responseGoogleFailure = (response, dispatch) => {
//     console.log("FAILED: ", response);
//     //  dispatch(signUpUserFailure(response.payload));
//   };

//   const GoogleAuth = () => (
//     <GoogleLogin
//       clientId="806477119130-9huh8k42odea2eqnu8pmtklk0knvj4qr.apps.googleusercontent.com"
//       buttonText="Sign in with Google"
//       onSuccess={resp => console.log(resp)}
//       onFailure={resp => console.log(resp)}
//       cookiePolicy="single_host_origin"
//       scope="profile email https://www.googleapis.com/auth/calendar.readonly"
//     />
//   );
//   console.log(GoogleAuth);
//   GoogleAuth();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.ROOT_URL}/auth/google/callback`,
//       passReqToCallback: true
//     },
//     (req, accessToken, refreshToken, params, profile, cb) => {
//       const expiryDate = moment()
//         .add(params.expires_in, "s")
//         .format("X");

//       users.findOne({ _id: profile.id }).then(user => {
//         if (user) {
//           cb(null, user);
//         } else {
//           const newUser = {
//             _id: profile.id,
//             name: profile.displayName,
//             imageUrl: profile._json.image.url,
//             accessToken,
//             refreshToken,
//             expiryDate
//           };
//           users.insertOne(newUser).then(() => {
//             boards
//               .insertOne(createWelcomeBoard(profile.id))
//               .then(() => cb(null, newUser));
//           });
//         }
//       });
//     }
//   )
// );
// };

// const configurePassport = db => {
//   const users = db.collection("users");
//   const boards = db.collection("boards");

//   passport.serializeUser((user, cb) => {
//     cb(null, user._id);
//   });
//   passport.deserializeUser((id, cb) => {
//     users.findOne({ _id: id }).then(user => {
//       cb(null, user);
//     });
//   });

//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: `${process.env.ROOT_URL}/auth/google/callback`,
//         passReqToCallback: true
//       },
//       (req, accessToken, refreshToken, params, profile, cb) => {

// 				const expiryDate = moment()
//           .add(params.expires_in, "s")
// 					.format("X");

//         users.findOne({ _id: profile.id }).then(user => {
//           if (user) {
//             cb(null, user);
//           } else {
//             const newUser = {
//               _id: profile.id,
//               name: profile.displayName,
// 							imageUrl: profile._json.image.url,
// 							accessToken,
// 							refreshToken,
// 							expiryDate
//             };
//             users.insertOne(newUser).then(() => {
//               boards
//                 .insertOne(createWelcomeBoard(profile.id))
//                 .then(() => cb(null, newUser));
//             });
//           }
//         });
//       }
//     )
//   );
// };

export default configurePassport;
