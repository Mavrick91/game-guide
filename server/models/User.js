const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  steamid: { type: String, required: true },
  communityvisibilitystate: { type: Number, required: true },
  profilestate: { type: Number, required: true },
  personaname: { type: String, required: true },
  profileurl: { type: String, required: true },
  avatar: { type: String, required: true },
  avatarmedium: { type: String, required: true },
  avatarfull: { type: String, required: true },
  avatarhash: { type: String, required: true },
  lastlogoff: { type: Number, required: true },
  personastate: { type: Number, required: true },
  primaryclanid: { type: String, required: false },
  timecreated: { type: String, required: false },
  personastateflags: { type: Number, required: false },
  loccountrycode: { type: String, required: false },
  locstatecode: { type: String, required: false },
  loccityid: { type: Number, required: false },
  iat: { type: Number, required: false },
  exp: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);
