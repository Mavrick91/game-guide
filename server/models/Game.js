const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceOverviewSchema = new Schema({
  final_formatted: String,
  initial_formatted: String,
  discount_percent: Number,
  final: Number,
  initial: Number,
  currency: String,
});

const GameSchema = new Schema({
  appID: Number,
  name: String,
  is_free: Boolean,
  price_overview: PriceOverviewSchema,
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
