'use strict';

const R = require('ramda');

// module.exports = async (ctx, user) => {
//   console.log('hi', user);
//   const data = { uid: user.id, provider: user.provider };
//   const auth = (await ctx.model.User.findOrCreate({
//     where: data,
//     default: data,
//   }))[0];
//   console.log('auth', auth);
//   if (auth.id) {
//     const existsUser = await ctx.model.User.findOne({
//       where: { id: auth.id },
//     });
//     console.log('existsUser', existsUser);
//     const raw_user = R.omit(
//       [ 'password' ],
//       existsUser.toJSON()
//     );
//     const token = await ctx.sign_token(raw_user);
//     ctx.body = token;
//     return token;
//   }
//   const newUser = await ctx.model.User.create({
//     username: user.name,
//     avatar: user.photo,
//     email: user.profile.profileUrl,
//   });
//   console.log('newUser', newUser);
//   auth.id = newUser.id;
//   await auth.save();
//   const raw_user = R.omit([ 'password' ], newUser.toJson());
//   const token = await ctx.sign_token(raw_user);
//   ctx.body = token;
//   return token;
// };
module.exports = async (ctx, user) => {
  const data = {
    uid: user.id,
    provider: user.provider,
  };
  const existsUser = await ctx.model.User.findOne({
    where: data,
  });
  let raw_user;
  if (existsUser && existsUser.id) {
    raw_user = R.omit(
      [ 'password' ],
      existsUser.toJSON()
    );
  } else {
    const newUser = await ctx.model.User.create({
      uid: user.id,
      provider: user.provider,
      username: user.name,
      avatar: user.photo,
      email: user.profile.profileUrl,
    });
    console.log('newUser', newUser);
    raw_user = R.omit([ 'password' ], newUser.toJSON());
  }
  console.log('raw_user', raw_user);
  const token = await ctx.sign_token(raw_user);
  ctx.body = token;
  return token;
};
